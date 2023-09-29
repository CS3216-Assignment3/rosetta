import CrossIcon from "./ui/cross-icon";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import TickIcon from "./ui/tick-icon";

export default function ChatBubbles({
    userBody,
    botBody,
    correct,
    evaluation,
}: {
    userBody: string;
    botBody: string;
    correct: boolean;
    evaluation: string;
}) {
    return (
        <>
            <p className="py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%]">
                {botBody}
            </p>
            <HoverCard>
                <HoverCardTrigger className="flex gap-1 py-2 px-4 bg-rosetta-sienna text-white rounded-lg rounded-br-none shadow max-w-[70%] self-end">
                    <p>{userBody}</p>
                    <div className="self-end">
                        {correct ? <TickIcon /> : <CrossIcon />}
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    className="overflow-auto w-80 max-h-40 bg-white shadow"
                    side="right"
                    sideOffset={20}
                    align="start"
                >
                    <p className="text-lg font-bold">Feedback</p>
                    <p>{evaluation}</p>
                </HoverCardContent>
            </HoverCard>
        </>
    );
}
