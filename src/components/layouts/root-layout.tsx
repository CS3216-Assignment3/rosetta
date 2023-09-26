import NavBar from "@/components/navbar";
import { Baloo_2 } from "next/font/google";
import { ReactNode } from "react";

const baloo = Baloo_2({
    subsets: ["latin"],
    variable: "--font-baloo",
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main
            className={`${baloo.variable} font-baloo bg-white text-rosetta-jet w-screen h-screen flex flex-col`}
        >
            <NavBar />
            {children}
        </main>
    );
}
