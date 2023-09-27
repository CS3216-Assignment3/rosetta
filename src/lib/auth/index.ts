import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo,
    AdditionalUserInfo,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/config";
import { createUser } from "@/lib/storage/user";

const googleProvider = new GoogleAuthProvider();

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

async function signUpWithGoogle() {
    let result: UserCredential | undefined = undefined;
    let error = undefined;
    try {
        result = await signInWithPopup(firebaseAuth, googleProvider);
        const additionalInfo = getAdditionalUserInfo(
            result,
        ) as AdditionalUserInfo;
        if (!additionalInfo.isNewUser) {
            await signOut(firebaseAuth);
            throw new Error("already signed up with google");
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

async function signInWithGoogle() {
    let result: UserCredential | undefined = undefined;
    let error = undefined;
    try {
        result = await signInWithPopup(firebaseAuth, googleProvider);
        const additionalInfo = getAdditionalUserInfo(
            result,
        ) as AdditionalUserInfo;
        if (additionalInfo.isNewUser) {
            await result.user.delete();
            throw new Error("new user, please sign up first");
        }
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function logOut() {
    let result = undefined;
    let error = undefined;
    try {
        result = await signOut(firebaseAuth);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export { signUp, signUpWithGoogle, signIn, signInWithGoogle, logOut };
