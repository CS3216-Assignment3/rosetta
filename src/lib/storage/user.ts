import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "@/lib/firebase/config";
import { UserCredential } from "firebase/auth";
import type { User } from "./models";

async function createUser(cred: UserCredential) {
    let result = undefined;
    let error = undefined;
    try {
        const newUser: User = {
            id: cred.user.uid,
            email: cred.user.email ?? "",
            nativeLanguage: "",
            currentLanguage: "",
            currentProficiency: "",
            topicPreferences: [],
        };
        result = await setDoc(
            doc(firebaseDB, "users", cred.user.uid),
            newUser,
            { merge: true },
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function getUser(userId: string) {
    let result = undefined;
    let error = undefined;
    try {
        result = (await getDoc(doc(firebaseDB, "users", userId))).data();
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function updateUser(userId: string, fields: Partial<User>) {
    let result = undefined;
    let error = undefined;
    try {
        result = await updateDoc(doc(firebaseDB, "users", userId), fields);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export { createUser, getUser, updateUser };
