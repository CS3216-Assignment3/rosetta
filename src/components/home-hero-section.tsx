import Image from "next/image";
import Link from "next/link";

export default function HomeHeroSection() {
    return (
        <section className="flex flex-col gap-12 items-center pt-36 w-full h-screen snap-start">
            <Image
                src="/rosettamascot.png"
                alt="rosettamascot"
                width={200}
                height={200}
            />
            <p className="text-5xl font-bold text-center">
                Learning languages one{" "}
                <span className="font-extrabold text-rosetta-orange">
                    conversation
                </span>{" "}
                at a time.
            </p>
            <div className="grid grid-cols-2 gap-12 justify-center">
                <Link
                    href="/signin"
                    className="py-4 px-8 text-xl font-bold text-center text-white rounded-lg duration-150 ease-in-out bg-rosetta-navy shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Sign In
                </Link>
                <Link
                    href="/signup"
                    className="py-4 px-8 text-xl font-bold text-center text-white rounded-lg duration-150 ease-in-out bg-rosetta-navy shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Sign Up
                </Link>
            </div>
        </section>
    );
}
