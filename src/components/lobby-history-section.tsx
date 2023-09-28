import LobbyHistoryCard from "@/components/lobby-history-card";
import { useAuth } from "@/lib/auth/context";
import { useEffect, useState } from "react";
import { Chat } from "@/lib/storage/models";
import { getReadOnlyChatsByUser } from "@/lib/storage/chat";

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
            <div className="flex flex-wrap gap-4 w-full h-full">
                {chats?.map((chat) => (
                    <LobbyHistoryCard chat={chat} key={chat.id} />
                ))}
            </div>
        </div>
    );
}
