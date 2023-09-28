import Link from "next/link";
import LobbyChatCard from "@/components/lobby-chat-card";
import { useAuth } from "@/lib/auth/context";
import { useEffect, useState } from "react";
import { Chat } from "@/lib/storage/models";
import { getChatsByUser } from "@/lib/storage/chat";

export default function LobbyChatsSection() {
    const { loading, user } = useAuth();
    const [chats, setChats] = useState<Chat[]>();

    useEffect(() => {
        (async () => {
            if (!loading && user !== undefined) {
                const { result, error } = await getChatsByUser(user.uid);
                if (error !== undefined) {
                    return console.log(error);
                }
                console.log("set chats");
                setChats(result as Chat[]);
            }
        })();
    }, [loading, user]);

    if (!loading && user === undefined) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <Link
                href="/newchat"
                className="py-2 px-4 w-max font-medium bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:bg-rosetta-orange hover:shadow-inset2"
            >
                New Chat
            </Link>
            <div className="flex flex-wrap gap-4 w-full h-full">
                {chats?.map((chat) => (
                    <LobbyChatCard chat={chat} key={chat.id} />
                ))}
            </div>
        </div>
    );
}
