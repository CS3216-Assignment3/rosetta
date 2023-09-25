import {
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "./config";
import { addUser } from "./database";

const auth = getAuth(firebaseApp);

async function signUp(email: string, password: string) {
    let result: UserCredential | null = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        if (result === null) {
            throw new Error("error signing up");
        }
        const { error: dbError } = await addUser(result);
        if (dbError !== null) {
            throw dbError;
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

async function signIn(email: string, password: string) {
    let result: UserCredential | null = null;
    let error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
        if (result === null) {
            throw new Error("error signing in");
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export { signUp, signIn };
