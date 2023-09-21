import Link from "next/link";

export default function NavBar() {
    return (
        <div className="flex justify-between p-8">
            <Link
                href="/"
                className="text-2xl uppercase font-titan text-rosetta-orange"
            >
                Rosetta
            </Link>
        </div>
    );
}
