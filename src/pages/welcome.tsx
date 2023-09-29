import Link from "next/link";

export default function WelcomePage() {
    return (
        <div className="flex flex-col gap-12 items-center pt-24 w-full h-full bg-gradient-to-t from-blaze-orange-200">
            <p className="text-7xl font-bold">
                Welcome to{" "}
                <span className="font-extrabold text-rosetta-orange">
                    Rosetta
                </span>
                !
            </p>
            <Link
                href="/lobby?section=chats"
                className="py-4 px-8 text-xl font-bold text-center text-white rounded-lg duration-150 ease-in-out bg-rosetta-navy shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
            >
                Go To Lobby
            </Link>
        </div>
    );
}
