import { Button } from "@/components/ui/button";
import { handleChat } from "@/features/ai/chat";
import { BotIcon } from "lucide-react";

export default function ChatbotDrawer() {
    return (
        <div className="fixed bottom-4 right-4">
            <Button
                className="size-14 rounded-full bg-primary text-white flex items-center justify-center"
                variant="outline"
                size="icon-lg"
                onClick={async () => {
                    const result = await handleChat();

                    console.log(result);
                }}
            >
                <BotIcon />
            </Button>
        </div>
    );
}
