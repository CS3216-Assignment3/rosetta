import Link from "next/link";

export default function LobbySidePanel({
    section,
}: {
    section: string | undefined;
}) {
    return (
        <div
            id="container"
            className="flex flex-col p-4 w-1/5 bg-gray-200 rounded-lg"
        >
            <Link
                href="/lobby?section=chats"
                className={`py-2 px-4 w-full font-bold text-left rounded-lg hover:text-white hover:bg-rosetta-orange ${
                    section === "chats" ? "bg-gray-300" : ""
                }`}
            >
                Chats
            </Link>
            <Link
                href="/lobby?section=history"
                className={`py-2 px-4 w-full font-bold text-left rounded-lg hover:text-white hover:bg-rosetta-orange ${
                    section === "history" ? "bg-gray-300" : ""
                }`}
            >
                History
            </Link>
            <Link
                href="/lobby?section=profile"
                className={`py-2 px-4 w-full font-bold text-left rounded-lg hover:text-white hover:bg-rosetta-orange ${
                    section === "profile" ? "bg-gray-300" : ""
                }`}
            >
                Profile
            </Link>
        </div>
    );
}
