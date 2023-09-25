import Link from "next/link";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center py-4 px-8 border-b shadow">
            <Link
                href="/"
                className="text-3xl uppercase font-titan text-rosetta-sienna"
            >
                Rosetta
            </Link>
            <div className="flex gap-8 items-center">
                <Link href="/lobby" className="text-lg font-medium">
                    Lobby
                </Link>
                <Link href="/chat" className="text-lg font-medium">
                    Chat
                </Link>
                <Link href="/signin" className="text-lg font-medium">
                    Sign In
                </Link>
                <Link href="/signup" className="text-lg font-medium">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
