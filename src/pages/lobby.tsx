import LobbySectionSelector from "@/components/lobby-section-selector";
import LobbySidePanel from "@/components/lobby-side-panel";
import { useAuth } from "@/lib/auth/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const [section, setSection] = useState<string>();

    useEffect(() => {
        if (!loading && user === undefined) {
            router.push("/");
        }
    }, [loading, user]);

    useEffect(() => {
        if (router.isReady) {
            setSection(router.query.section as string | undefined);
        }
    }, [router.isReady, router.query]);

    return (
        <div
            id="container"
            className="flex gap-8 items-start self-center pt-12 w-2/3 h-full"
        >
            <LobbySidePanel section={section} />
            <div className="w-full h-full">
                <LobbySectionSelector section={section} />
            </div>
        </div>
    );
}
