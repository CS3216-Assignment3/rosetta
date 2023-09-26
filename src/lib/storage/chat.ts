import {
    doc,
    collection,
    query,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { firebaseDB } from "@/firebase/config";
import type { UserMessage, BotMessage } from "./models";

type CreateChatFields = {
    botName: string;
    language: string;
    topic: string;
    proficiency: string;
    readOnly: boolean;
};

async function createChat(userId: string, fields: CreateChatFields) {
    let result = undefined;
    let error = undefined;
    try {
        result = await addDoc(
            collection(firebaseDB, "users", userId, "chats"),
            fields,
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function getChatById(userId: string, chatId: string) {
    let result = undefined;
    let error = undefined;
    try {
        result = (
            await getDoc(doc(firebaseDB, "users", userId, "chats", chatId))
        ).data();
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function getChatsByUser(userId: string) {
    let result: any[] = [];
    let error = undefined;
    try {
        const q = query(collection(firebaseDB, "users", userId, "chats"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function addUserMessage(
    userId: string,
    chatId: string,
    message: UserMessage,
) {
    let result = undefined;
    let error = undefined;
    try {
        result = await addDoc(
            collection(
                firebaseDB,
                "users",
                userId,
                "chats",
                chatId,
                "messages",
            ),
            message,
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function addBotMessage(
    userId: string,
    chatId: string,
    message: BotMessage,
) {
    let result = undefined;
    let error = undefined;
    try {
        result = await addDoc(
            collection(
                firebaseDB,
                "users",
                userId,
                "chats",
                chatId,
                "messages",
            ),
            message,
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function updateReadOnlyChat(userId: string, chatId: string) {
    let result = undefined;
    let error = undefined;
    try {
        result = await updateDoc(
            doc(firebaseDB, "users", userId, "chats", chatId),
            { readOnly: true },
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export {
    createChat,
    getChatById,
    getChatsByUser,
    addUserMessage,
    addBotMessage,
    updateReadOnlyChat,
};
