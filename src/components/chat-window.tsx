import ChatBubbles from "@/components/chat-bubbles";
import { useAuth } from "@/lib/auth/context";
import { addMessage, getChatById, getMessagesByChat } from "@/lib/storage/chat";
import { Chat, Message } from "@/lib/storage/models";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef } from "react";
import metadata from "public/languagemetadata.json";
import { useStore } from "@/stores/rosetta-store";

export default function ChatWindow() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const chat = useStore((state) => state.chat);
    const setChat = useStore((state) => state.setChat);
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const formRef = useRef<HTMLFormElement>(null);

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

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (user === undefined) {
                return console.log("not signed in");
            }
            if (chat === undefined) {
                return console.log("chat is undefined");
            }
            const input = formRef.current?.elements["input"].value as string;
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
            setMessages([newMessage, ...messages]);
            formRef.current?.reset();
        } catch (e) {
            return console.log(e);
        }
    };

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
            <form
                ref={formRef}
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
    );
}
