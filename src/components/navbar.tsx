import { logOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth/context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center py-4 px-8 border-b shadow">
            <Link
                href="/"
                className="text-3xl font-extrabold text-rosetta-navy"
            >
                <Image
                    src="/rosettafull.png"
                    alt="rosettafull"
                    width={150}
                    height={150}
                />
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
                    Chats
                </Link>
                <Link
                    href="/lobby?section=history"
                    className="text-lg font-medium"
                >
                    History
                </Link>
                <Link
                    href="/lobby?section=profile"
                    className="text-lg font-medium"
                >
                    Profile
                </Link>
                <button onClick={handleLogOut} className="text-lg font-medium">
                    Log Out
                </button>
            </>
        );
    }
}
