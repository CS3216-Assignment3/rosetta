import ChatBubbles from "@/components/chat-bubbles";
import { useAuth } from "@/lib/auth/context";
import { addMessage, getChatById, getMessagesByChat } from "@/lib/storage/chat";
import { Chat, Message } from "@/lib/storage/models";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/rosetta-store";
import { getUser } from "@/lib/storage/user";
import RosettaCommaIcon from "./ui/rosetta-comma-icon";

export default function ChatWindow() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const chat = useStore((state) => state.chat);
    const setChat = useStore((state) => state.setChat);
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const formRef = useRef<HTMLFormElement>(null);
    const [disabled, setDisabled] = useState(false);
    const [greeting, setGreeting] = useState("");

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

                const metadata = await (
                    await fetch(
                        `/api/metadata?language=${chatResult?.language}`,
                    )
                ).json();
                console.log("metadata", metadata);
                setGreeting(metadata.greeting);
            }
        })();
    }, [router.query.id, loading, user]);

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setDisabled(true);
            if (user === undefined) {
                throw Error("not signed in");
            }
            if (chat === undefined) {
                throw Error("chat is undefined");
            }
            const input = formRef.current?.elements["input"].value as string;
            if (input === "") {
                throw Error("empty input");
            }
            const { result: userDetails, error: getUserError } = await getUser(
                user.uid,
            );
            if (getUserError !== undefined || userDetails === undefined) {
                throw getUserError;
            }
            const apiResponse = await (
                await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        input,
                        nativeLanguage: userDetails.nativeLanguage,
                        language: chat.language,
                        topic: chat.topic,
                        proficiency: chat.proficiency,
                        history: messages,
                    }),
                })
            ).json();
            const newMessage = apiResponse.message;
            console.log("handleSendMessage", newMessage);
            const { error: addMessageError } = await addMessage(
                user.uid,
                chat.id,
                newMessage,
            );
            if (addMessageError !== undefined) {
                throw addMessageError;
            }
            setMessages([newMessage, ...messages]);
            formRef.current?.reset();
            setDisabled(false);
        } catch (e) {
            setDisabled(false);
            return console.log("handleSendMessage", e);
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
                        correct={message.evaluation.correct}
                        evaluation={message.evaluation.content}
                    />
                ))}
                <p className="py-2 px-4 rounded-lg rounded-bl-none bg-gray-200 max-w-[70%]">
                    {greeting}
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
                    disabled={disabled}
                    placeholder="type message here"
                    className="w-full rounded-lg border-gray-200 shadow-inner"
                />
                <button
                    type="submit"
                    disabled={disabled}
                    className="flex items-center p-2 rounded-full duration-150 ease-in-out text-rosetta-orange bg-rosetta-navy"
                >
                    <RosettaCommaIcon />
                </button>
            </form>
        </div>
    );
}
