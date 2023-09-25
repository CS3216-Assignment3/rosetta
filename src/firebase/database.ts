import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import firebaseApp from "./config";
import { UserCredential } from "firebase/auth";

type User = {
    id: string;
    email: string;
    nativeLanguage: string;
    currentLanguage: string;
    currentProficiency: string;
    favouriteTopics: string[];
    chats: Chat[];
};

type Chat = {
    id: string;
    botName: string;
    language: string;
    topic: string;
    proficiency: string;
    messages: Message[];
};

type Message = {
    id: string;
    body: string;
    evaluation?: {
        mistake: boolean;
        body: string;
    };
};

const db = getFirestore(firebaseApp);

async function getData(collection: string, id: string) {
    let result = null;
    let error = null;

    try {
        result = await getDoc(doc(db, collection, id));
    } catch (e) {
        error = e;
    }

    return { result, error };
}

async function addData(collection: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

async function addUser(cred: UserCredential) {
    const newUser: User = {
        id: cred.user.uid,
        email: cred.user.email ?? "",
        nativeLanguage: "",
        currentLanguage: "",
        currentProficiency: "",
        favouriteTopics: [],
        chats: [],
    };
    return await addData("users", cred.user.uid, newUser);
}

export { getData, addData, addUser };
