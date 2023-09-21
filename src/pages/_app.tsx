import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Titan_One } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const titan = Titan_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-titan",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main
            className={`${inter.variable} ${titan.variable} font-inter bg-rosetta-white h-screen flex flex-col`}
        >
            <Component {...pageProps} />
        </main>
    );
}
