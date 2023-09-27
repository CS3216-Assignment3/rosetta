import LobbyChatsSection from "./lobby-chats-section";
import LobbyHistorySection from "./lobby-history-section";
import LobbyUserProfileSection from "@/components/lobby-user-profile-section";

export default function LobbySectionSelector({
    section,
}: {
    section: string | undefined;
}) {
    if (section === undefined) {
        return <></>;
    }

    if (section === "chats") {
        return <LobbyChatsSection />;
    }

    if (section === "history") {
        return <LobbyHistorySection />;
    }

    if (section === "profile") {
        return <LobbyUserProfileSection />;
    }

    return <div>Error</div>;
}
