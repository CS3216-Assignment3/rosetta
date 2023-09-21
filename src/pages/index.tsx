import { Inter, Titan_One } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const titan = Titan_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <p className={`text-9xl uppercase ${titan.className}`}>Rosetta</p>
        </main>
    );
}
