import {
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import firebaseApp from "./config";
import { addUser } from "./database";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

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

async function signInWithGoogle() {
    let result = null;
    let error = null;

    try {
        const res = await signInWithPopup(auth, provider);
        if (res === null) {
            throw new Error("error signing in")
        }
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential?.accessToken;
        // The signed-in user info.
        const result = res.user;
      } catch (e: any) {
        // Handle Errors here.
        const errorCode = e.code;
        const errorMessage = e.message;
        // The email of the user's account used.
        const email = e.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(e);
        error = e
      }

      return { result, error }
}

export { signUp, signIn, signInWithGoogle };


