import { useAuth } from "@/lib/auth/context";
import { getChatsByUser } from "@/lib/storage/chat";
import { Chat } from "@/lib/storage/models";
import { useStore } from "@/stores/rosetta-store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatLeftSideBar() {
    const { loading, user } = useAuth();
    const chat = useStore((state) => state.chat);
    const [displayedChats, setDisplayedChats] = useState<Chat[]>([]);

    useEffect(() => {
        (async () => {
            if (!loading && user !== undefined && chat !== undefined) {
                const { result, error } = await getChatsByUser(user.uid);
                if (error !== undefined) {
                    return console.log("error loading chats by user", error);
                }
                setDisplayedChats(result.filter((c) => c.id !== chat.id));
            }
        })();
    }, [loading, user, chat]);

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-1/3 h-full">
            <div className="flex flex-col gap-2 w-3/4">
                <h1 className="py-2 px-4 text-xl font-bold bg-gray-200 rounded-lg">
                    Current Chat
                </h1>
                <div className="py-2 px-4 w-full rounded-lg border-2 shadow border-rosetta-sienna">
                    <p className="font-bold">{chat?.botName}</p>
                    <p className="capitalize">
                        {chat?.language} ({chat?.proficiency}) | {chat?.topic}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-3/4">
                <h1 className="py-2 px-4 text-xl font-bold bg-gray-200 rounded-lg">
                    All Chats
                </h1>
                {displayedChats.map((chat, idx) => (
                    <Link href={`/chat?id=${chat.id}`}>
                        <div
                            key={idx}
                            className="py-2 px-4 w-full rounded-lg border-2 border-gray-200 shadow hover:border-rosetta-sienna"
                        >
                            <p className="font-bold">{chat?.botName}</p>
                            <p className="capitalize">
                                {chat?.language} ({chat?.proficiency}) |{" "}
                                {chat?.topic}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
