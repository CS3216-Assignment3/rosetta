import Link from "next/link";

export default function WelcomePage() {
    return (
        <div className="flex flex-col gap-12 items-center pt-24 w-full h-full">
            <p className="text-7xl font-bold">
                Welcome to{" "}
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-rosetta-coral to-rosetta-orange">
                    Rosetta
                </span>
                !
            </p>
            <Link
                href="/lobby?section=chats"
                className="py-4 px-8 text-xl font-bold text-center rounded-lg duration-150 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
            >
                Go To Lobby
            </Link>
        </div>
    );
}
