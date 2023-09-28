import {
    doc,
    collection,
    query,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { firebaseDB } from "@/lib/firebase/config";

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
            { ...fields, timestamp: serverTimestamp() },
        );
        await setDoc(result, { id: result.id }, { merge: true });
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
        const q = query(
            collection(firebaseDB, "users", userId, "chats"),
            orderBy("timestamp", "desc"),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function getMessagesByChat(userId: string, chatId: string) {
    let result: any[] = [];
    let error = undefined;
    try {
        const q = query(
            collection(
                firebaseDB,
                "users",
                userId,
                "chats",
                chatId,
                "messages",
            ),
            orderBy("timestamp", "desc"),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
    } catch (e) {
        error = e;
    }
    return { result, error };
}

type AddMessageFields = {
    user: string;
    bot: string;
    evaluation: {
        mistake: boolean;
        content: string;
    };
};

async function addMessage(
    userId: string,
    chatId: string,
    fields: AddMessageFields,
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
            { ...fields, timestamp: serverTimestamp() },
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
    getMessagesByChat,
    addMessage,
    updateReadOnlyChat,
};
