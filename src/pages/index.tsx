import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12 items-center pt-24 w-full h-full">
            <p className="text-5xl font-bold text-center">
                Learning languages one{" "}
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-rosetta-coral to-rosetta-orange">
                    conversation
                </span>{" "}
                at a time.
            </p>
            <div className="grid grid-cols-2 gap-12 justify-center">
                <Link
                    href="/signin"
                    className="py-4 px-8 text-xl font-bold text-center rounded-lg duration-150 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Sign In
                </Link>
                <Link
                    href="/signup"
                    className="py-4 px-8 text-xl font-bold text-center rounded-lg duration-150 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
