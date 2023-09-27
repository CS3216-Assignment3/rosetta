import { logOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth/context";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center py-4 px-8 border-b shadow">
            <Link
                href="/"
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-rosetta-coral to-rosetta-orange"
            >
                Rosetta
            </Link>
            <div className="flex gap-8 items-center">
                <Links />
            </div>
        </div>
    );
}

function Links() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const handleLogOut = async () => {
        await logOut();
        router.push("/");
    };

    if (loading) {
        return <></>;
    }

    if (user === undefined) {
        return (
            <>
                <Link href="/signin" className="text-lg font-medium">
                    Sign In
                </Link>
                <Link href="/signup" className="text-lg font-medium">
                    Sign Up
                </Link>
            </>
        );
    } else {
        return (
            <>
                <Link
                    href="/lobby?section=chats"
                    className="text-lg font-medium"
                >
                    Lobby
                </Link>
                <Link href="/chat" className="text-lg font-medium">
                    Chat
                </Link>
                <button onClick={handleLogOut} className="text-lg font-medium">
                    Log Out
                </button>
            </>
        );
    }
}
