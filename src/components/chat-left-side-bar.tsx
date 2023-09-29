import { useAuth } from "@/lib/auth/context";
import { getChatsByUser, updateReadOnlyChat } from "@/lib/storage/chat";
import { Chat } from "@/lib/storage/models";
import { useStore } from "@/stores/rosetta-store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChatLeftSideBar() {
    const { loading, user } = useAuth();
    const chat = useStore((state) => state.chat);
    const [displayedChats, setDisplayedChats] = useState<Chat[]>([]);
    const router = useRouter();

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

    const handleEndChat = async () => {
        if (user === undefined) {
            return console.log("handleEndChat not signed in");
        }
        if (chat === undefined) {
            return console.log("handleEndChat chat is undefined");
        }
        const { result, error } = await updateReadOnlyChat(user.uid, chat.id);
        if (error !== undefined) {
            return console.log("handleEndChat", error);
        }
        console.log("handleEndChat success", result);
        router.push("/lobby?section=chats");
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-1/3 h-full">
            <div className="flex flex-col gap-4 w-3/4">
                <h1 className="py-2 px-4 text-xl font-bold rounded-lg bg-rosetta-coral">
                    Current Chat
                </h1>
                <div className="flex justify-between items-center w-full">
                    <div>
                        <p className="font-bold">{chat?.botName}</p>
                        <p className="capitalize">
                            {chat?.language} ({chat?.proficiency}) |{" "}
                            {chat?.topic}
                        </p>
                    </div>
                    <button
                        onClick={handleEndChat}
                        className="py-2 px-4 w-max font-bold bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white h-max shadow-inset hover:bg-blaze-orange-600"
                    >
                        End Chat
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-3/4">
                <h1 className="py-2 px-4 text-xl font-bold bg-gray-200 rounded-lg">
                    All Chats
                </h1>
                {displayedChats.map((chat, idx) => (
                    <Link key={idx} href={`/chat?id=${chat.id}`}>
                        <div className="py-2 px-4 w-full rounded-lg border-2 border-gray-200 shadow hover:border-rosetta-sienna">
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
