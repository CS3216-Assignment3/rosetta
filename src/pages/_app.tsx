import RootLayout from "@/components/layouts/root-layout";
import { AuthProvider } from "@/lib/auth/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </AuthProvider>
    );
}
