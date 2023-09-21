import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center p-24 w-full h-full">
            <div className="flex flex-col gap-12 items-center">
                <p className="text-9xl uppercase text-rosetta-orange font-titan">
                    Rosetta
                </p>
                <div className="flex gap-20 justify-center w-full">
                    <Link
                        className="p-4 w-full text-2xl font-bold text-center rounded-lg duration-300 ease-in-out bg-rosetta-orange text-rosetta-white hover:bg-rosetta-navy"
                        href="/signin"
                    >
                        Sign In
                    </Link>
                    <Link
                        className="p-4 w-full text-2xl font-bold text-center rounded-lg duration-300 ease-in-out bg-rosetta-orange text-rosetta-white hover:bg-rosetta-navy"
                        href="/signup"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
