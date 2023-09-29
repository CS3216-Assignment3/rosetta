import ChatBubbles from "@/components/chat-bubbles";
import { useAuth } from "@/lib/auth/context";
import {
    getChatById,
    getMessagesByChat,
    getMistakes,
    updateStudyPlan,
} from "@/lib/storage/chat";
import { Chat, Message } from "@/lib/storage/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import metadata from "public/languagemetadata.json";
import { useStore } from "@/stores/rosetta-store";
import { getUser } from "@/lib/storage/user";

export default function HistoryWindow() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const chat = useStore((state) => state.chat);
    const setChat = useStore((state) => state.setChat);
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
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

    const handleCreateStudyPlan = async () => {
        try {
            setDisabled(true);
            if (user === undefined) {
                throw Error("not signed in");
            }
            if (chat === undefined) {
                throw Error("chat is undefined");
            }
            const { result: mistakes, error: getMistakesError } =
                await getMistakes(user.uid, chat.id);
            if (getMistakesError !== undefined) {
                throw getMistakesError;
            }
            const { result: userDetails, error: getUserError } = await getUser(
                user.uid,
            );
            if (getUserError !== undefined || userDetails === undefined) {
                throw getUserError;
            }
            const apiResponse = await (
                await fetch("/api/plan", {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        nativeLanguage: userDetails.nativeLanguage,
                        language: chat.language,
                        topic: chat.topic,
                        proficiency: chat.proficiency,
                        mistakes,
                    }),
                })
            ).json();
            const plan = apiResponse.plan;
            console.log("handleCreatePlan", plan);
            const { error: addMessageError } = await updateStudyPlan(
                user.uid,
                chat.id,
                plan,
            );
            if (addMessageError !== undefined) {
                throw addMessageError;
            }
            setDisabled(false);
        } catch (e) {
            setDisabled(false);
            return console.log("handleCreatePlan", e);
        }
        router.reload();
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
                <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                    {chat !== undefined ? metadata[chat.language].greeting : ""}
                </p>
            </div>
            <button
                type="submit"
                disabled={disabled}
                onClick={handleCreateStudyPlan}
                className="py-4 px-8 w-full text-xl font-bold rounded-lg duration-150 ease-in-out hover:text-white shadow-inset bg-rosetta-coral hover:shadow-inset2 hover:bg-rosetta-orange"
            >
                Create Study Plan
            </button>
        </div>
    );
}
