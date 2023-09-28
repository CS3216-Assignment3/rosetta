import { Chat } from "@/lib/storage/models";
import Link from "next/link";

export default function LobbyHistoryCard({ chat }: { chat: Chat }) {
    return (
        <Link href={`/history?id=${chat.id}`}>
            <div className="flex flex-col gap-2 p-4 w-max rounded-lg border-2 border-gray-200 shadow duration-150 ease-in-out h-max hover:border-rosetta-orange">
                <div className="bg-gray-500 rounded-lg w-[200px] h-[200px]"></div>
                <div>
                    <p className="text-lg font-bold capitalize">
                        {chat.botName}
                    </p>
                    <p className="capitalize">
                        {chat.language} ({chat.proficiency})
                    </p>
                    <p className="capitalize">{chat.topic}</p>
                </div>
            </div>
        </Link>
    );
}
