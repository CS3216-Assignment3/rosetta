import ChatBubbles from "@/components/chat-bubbles";
import { useAuth } from "@/lib/auth/context";
import { addMessage, getChatById, getMessagesByChat } from "@/lib/storage/chat";
import { Chat, Message } from "@/lib/storage/models";
import { useChatStore } from "@/stores/chat-store";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import metadata from "public/languagemetadata.json";

export default function ChatPage() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const { chat, setChat, messages, setMessages } = useChatStore();

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
                    return console.log("error getting chat", chatError);
                }
                setChat(chatResult as Chat);
                console.log("useEffect", chatResult);

                const { result: messagesResult, error: messagesError } =
                    await getMessagesByChat(user.uid, chatId);
                if (messagesError !== undefined) {
                    return console.log("error getting messages", messagesError);
                }
                setMessages(messagesResult as Message[]);
                console.log("useEffect", messagesResult);
            }
        })();
    }, [router.query.id, loading, user]);

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (user === undefined) {
                return console.log("not signed in");
            }
            if (chat === undefined) {
                return console.log("chat is undefined");
            }
            const input = (
                e.currentTarget.elements.namedItem("input") as HTMLInputElement
            ).value as string;
            if (input === "") {
                return console.log("empty input");
            }
            const apiResponse = await (
                await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        language: chat.language,
                        topic: chat.topic,
                        proficiency: chat.proficiency,
                        history: messages,
                        input,
                    }),
                })
            ).json();
            const newMessage = apiResponse.message;
            console.log("handleSendMessage", newMessage);
            const { error } = await addMessage(user.uid, chat.id, newMessage);
            if (error !== undefined) {
                return console.log("error adding message", error);
            }
            setMessages([...messages, newMessage]);
        } catch (e) {
            return console.log(e);
        }
    };

    return (
        <div className="flex overflow-hidden flex-col items-center pt-4 w-full h-full flex-start">
            <div
                id="chat-window"
                className="flex overflow-hidden flex-col gap-4 items-center p-4 w-1/3 h-full bg-white rounded-t-lg border border-b-0 shadow scroll-smooth"
            >
                <div
                    id="chat-messages"
                    className="flex overflow-y-auto flex-col gap-4 w-full h-full no-scrollbar"
                >
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        {chat !== undefined
                            ? metadata[chat.language].greeting
                            : ""}
                    </p>
                    {messages.map((message, idx) => (
                        <ChatBubbles
                            key={idx}
                            botBody={message.bot}
                            userBody={message.user}
                        />
                    ))}
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="flex gap-4 items-center w-full h-min"
                >
                    <input
                        type="text"
                        name="input"
                        placeholder="type message here"
                        className="w-full rounded-lg border-gray-200 shadow-inner"
                    />
                    <button
                        type="submit"
                        className="rounded-full w-[30px] h-[30px] bg-rosetta-sienna"
                    ></button>
                </form>
            </div>
        </div>
    );
}
