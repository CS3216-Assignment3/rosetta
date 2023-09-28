import ChatBubbles from "@/components/chat-bubbles";
import { useAuth } from "@/lib/auth/context";
import { getChatById, getMessagesByChat } from "@/lib/storage/chat";
import { Chat, Message } from "@/lib/storage/models";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import metadata from "public/languagemetadata.json";
import { useStore } from "@/stores/rosetta-store";

export default function HistoryWindow() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const chat = useStore((state) => state.chat);
    const setChat = useStore((state) => state.setChat);
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const formRef = useRef<HTMLFormElement>(null);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        (async () => {
            if (
                router.query.id !== undefined &&
                !loading &&
                user !== undefined
            ) {
                const chatId = router.query.id as string;

                const { result: chatResult, error: chatError } =
                    await getChatById(user.uid, chatId);
                if (chatError !== undefined) {
                    return console.log(
                        "chatwindow-useEffect-messageError",
                        chatError,
                    );
                }
                setChat(chatResult as Chat);
                console.log("chatwindow-useEffect", chatResult);

                const { result: messagesResult, error: messagesError } =
                    await getMessagesByChat(user.uid, chatId);
                if (messagesError !== undefined) {
                    return console.log(
                        "chatwindow-useEffect-messageError",
                        messagesError,
                    );
                }
                setMessages(messagesResult as Message[]);
                console.log("chatwindow-useEffect", messagesResult);
            }
        })();
    }, [router.query.id, loading, user]);

    return (
        <div
            id="chat-window"
            className="flex overflow-hidden flex-col gap-4 items-center p-4 w-1/3 h-full bg-white rounded-t-lg border border-b-0 shadow scroll-smooth"
        >
            <div
                id="chat-messages"
                className="flex overflow-y-auto flex-col-reverse gap-4 w-full h-full no-scrollbar"
            >
                {messages.map((message, idx) => (
                    <ChatBubbles
                        key={idx}
                        botBody={message.bot}
                        userBody={message.user}
                    />
                ))}
                <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                    {chat !== undefined ? metadata[chat.language].greeting : ""}
                </p>
            </div>
            <button
                type="submit"
                disabled={disabled}
                className="py-4 px-8 w-full text-xl font-bold rounded-lg duration-150 ease-in-out hover:text-white shadow-inset bg-rosetta-coral hover:shadow-inset2 hover:bg-rosetta-orange"
            >
                Create Study Plan
            </button>
        </div>
    );
}
