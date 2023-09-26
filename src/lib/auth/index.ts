import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { createUser } from "@/lib/storage/user";

async function signUp(email: string, password: string) {
    let result: UserCredential | undefined = undefined;
    let error = undefined;
    try {
        result = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );
        if (result === undefined) {
            throw new Error("error signing up");
        }
        const { error: dbError } = await createUser(result);
        if (dbError) {
            throw new Error("error creating user");
        }
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function signIn(email: string, password: string) {
    let result: UserCredential | undefined = undefined;
    let error = undefined;
    try {
        result = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export { signUp, signIn };
