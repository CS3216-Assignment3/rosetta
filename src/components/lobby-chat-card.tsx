import { Chat } from "@/lib/storage/models";
import Link from "next/link";

export default function LobbyChatCard({
    chat,
    url,
}: {
    chat: Chat;
    url: string;
}) {
    return (
        <Link href={`/${url}?id=${chat.id}`}>
            <div className="flex gap-2 p-4 w-max bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset h-max hover:shadow-inset2 hover:bg-rosetta-orange">
                <div>
                    <p className="text-lg font-bold capitalize">
                        {chat.botName}
                    </p>
                    <p className="capitalize">
                        {chat.language} ({chat.proficiency}) | {chat.topic}
                    </p>
                </div>
            </div>
        </Link>
    );
}
