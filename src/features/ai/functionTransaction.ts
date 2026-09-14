import { FunctionDeclaration, Type } from "@google/genai";

export const transactionProperties = {
    id: {
        type: Type.STRING,
        description: "The unique identifier of the transaction",
    },
    amount: {
        type: Type.NUMBER,
        description:
            "The amount of the transaction. It should be a positive number.",
    },
    type: {
        type: Type.STRING,
        enum: ["income", "expense"],
        description: "The type of the transaction, either 'Income' or 'Expense'.",
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
};

export const getTransactionDeclaration: FunctionDeclaration = {
    name: "get_transaction",
    description: "Get all transactions from the user's financial history.",
    parameters: {
        type: Type.OBJECT,
        properties: transactionProperties,
    },
};

export const createTransactionDeclaration: FunctionDeclaration = {
    name: "create_transaction",
    description:
        "Create a new transaction in the user's financial history based on the provided details.",
    parameters: {
        type: Type.OBJECT,
        properties: transactionProperties,
        required: ["amount", "type", "category", "description", "date"],
    },
};

export const deleteTransactionDeclaration: FunctionDeclaration = {
    name: "delete_transaction",
    description:
        "Delete an existing transaction from user's financial history based on the provided data",
    parameters: {
        type: Type.OBJECT,
        properties: transactionProperties,
    },
};

export const updateTransactionDeclaration: FunctionDeclaration = {
    name: "update_transaction",
    description:
        "Update an existing transaction from user's financial history based on the provided data",
    parameters: {
        type: Type.OBJECT,
        properties: transactionProperties,
    },
};
