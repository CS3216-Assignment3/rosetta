import NavBar from "@/components/navbar";
import { Titan_One, Baloo_2 } from "next/font/google";
import { ReactNode } from "react";

const titan = Titan_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-titan",
});

const baloo = Baloo_2({
    subsets: ["latin"],
    variable: "--font-baloo",
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main
            className={`${baloo.variable} ${titan.variable} font-baloo bg-white text-rosetta-jet w-screen h-screen flex flex-col`}
        >
            <NavBar />
            {children}
        </main>
    );
}
