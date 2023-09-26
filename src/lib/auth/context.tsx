import { User } from "firebase/auth";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { firebaseAuth } from "@/firebase/config";

type AuthContext = {
    user: User | undefined;
    loading: boolean;
};

const authContext = createContext<AuthContext>({
    user: undefined,
    loading: false,
});

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsub = firebaseAuth.onAuthStateChanged((currUser) => {
            if (currUser) {
                setUser(currUser);
            }
            console.log("currUser:", currUser);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <authContext.Provider value={{ user, loading }}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

export { AuthProvider, useAuth };
