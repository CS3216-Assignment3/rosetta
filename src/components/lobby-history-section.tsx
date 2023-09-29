import { useAuth } from "@/lib/auth/context";
import { useEffect, useState } from "react";
import { Chat } from "@/lib/storage/models";
import { getReadOnlyChatsByUser } from "@/lib/storage/chat";
import LobbyChatCard from "@/components/lobby-chat-card";

export default function LobbyHistorySection() {
    const { loading, user } = useAuth();
    const [chats, setChats] = useState<Chat[]>();

    useEffect(() => {
        (async () => {
            if (!loading && user !== undefined) {
                const { result, error } = await getReadOnlyChatsByUser(
                    user.uid,
                );
                if (error !== undefined) {
                    return console.log(error);
                }
                setChats(result as Chat[]);
            }
        })();
    }, [loading, user]);

    if (!loading && user === undefined) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {chats?.length !== 0 ? (
                <div className="flex flex-wrap gap-4 w-full">
                    {chats?.map((chat) => (
                        <LobbyChatCard
                            chat={chat}
                            url="history"
                            key={chat.id}
                        />
                    ))}
                </div>
            ) : (
                <p>No history</p>
            )}
        </div>
    );
}
