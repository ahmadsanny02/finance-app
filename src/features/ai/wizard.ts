"use server";

import z from "zod";
import { createAI } from "./instance";
import { FunctionDeclaration, Type } from "@google/genai";
import { createTransaction } from "../transaction/action";

const transactionSchema = z.object({
    amount: z.number().default(0).describe("Transaction nominal"),
    type: z.enum(["income", "expense"]).describe("Type of transaction"),
    category: z
        .enum([
            "Education & Development",
            "Entertainment",
            "Event",
            "Food & Drink",
            "Hobby",
            "Internet",
            "Life",
            "Missing",
            "Other",
            "Refund",
            "Salary",
            "Shopping",
            "Software",
            "Transportation",
        ])
        .describe("Category of transaction"),
    description: z.string().describe("Short text for describing transaction"),
    date: z.string().describe("The date in YYYY-MM-DD format"),
});

export async function handleWizardInput(message: string) {
    const contents = `
    <role>
        You are an AI Wizard finance assitant, who can extract transaction details from text.
    </role>
    <instruction>
        Extract the transaction details from the following text and return it as a structure JSON object.
        The JSON object must have exactly these fields:
        - "amount": a number representing the cost (positive). Use 0 if not provided.
        - "type": type of transaction, either 'income' or 'expense'.
        - "category": choose the most appropriate category from this exact list:
            "Education & Development",
            "Entertainment",
            "Event",
            "Food & Drink",
            "Hobby",
            "Internet",
            "Life",
            "Missing",
            "Other",
            "Refund",
            "Salary",
            "Shopping",
            "Software",
            "Transportation".
        - "description": a short string describing the transaction, first letter capitalized.
        - "date": date of transaction in YYYY-MM-DD format.
        Assume the current date if relative terms like 'today' or 'just now'. If not define use current date.
    </instruction>
    <context>
        Current Date : ${new Date().toISOString()}
    </context>
    <input>
        Text to extract: ${message}
    </input>
    <outputFormat>
        Respond with only the raw JSON object, no markdown blocks, no text before or after.
    </outputFormat>
    `;

    const ai = createAI();
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(transactionSchema),
        },
    });

    const transaction = transactionSchema.parse(JSON.parse(`${response.text}`));

    if (transaction.amount <= 0) {
        throw new Error("Cannot create transaction with invalid amount");
    }

    return transaction;
}

const createTransactionDeclaration: FunctionDeclaration = {
    name: "create_transaction",
    description:
        "Create a new transaction in the user's financial history based on the provided details.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            amount: {
                type: Type.NUMBER,
                description:
                    "The amount of the transaction. It should be a positive number.",
            },
            type: {
                type: Type.STRING,
                enum: ["income", "expense"],
                description:
                    "The type of the transaction, either 'Income' or 'Expense'.",
            },
            category: {
                type: Type.STRING,
                enum: [
                    "Education & Development",
                    "Entertainment",
                    "Event",
                    "Food & Drink",
                    "Hobby",
                    "Internet",
                    "Life",
                    "Missing",
                    "Other",
                    "Refund",
                    "Salary",
                    "Shopping",
                    "Software",
                    "Transportation",
                ],
                description: "The category of the transaction.",
            },
            description: {
                type: Type.STRING,
                description: "A brief description of the transaction.",
            },
            date: {
                type: Type.STRING,
                description:
                    "The date of the transaction in YYYY-MM-DD format. If not provided, the current date will be used.",
            },
        },
        required: ["amount", "type", "category", "description", "date"],
    },
};

export async function handleWizardTools(message: string) {
    const contents = `
    <role>
        You are an AI Wizard finance assitant, who can extract transaction details from text.
    </role>
    <instruction>
        Extract the transaction details from the following text.
    </instruction>
    <context>
        Current Date : ${new Date().toISOString()}
    </context>
    <input>
        Text to extract: ${message}
    </input>
    `;

    const ai = createAI();
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
            tools: [
                {
                    functionDeclarations: [createTransactionDeclaration],
                },
            ],
        },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0];

        switch (functionCall.name) {
            case "create_transaction":
                const args = functionCall.args;

                if (!args) {
                    throw new Error("No arguments provided for the function call.");
                }

                const transaction = transactionSchema.parse(args);

                if (transaction.amount <= 0) {
                    throw new Error("Cannot create transaction with invalid amount");
                }

                await createTransaction(transaction);

                break;
            default:
                throw new Error("Unknown function call");
        }
    } else {
        throw new Error("AI did not call any function.");
    }
}
