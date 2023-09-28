import ChatLeftSideBar from "@/components/chat-left-side-bar";
import ChatWindow from "@/components/chat-window";

export default function ChatPage() {
    return (
        <div className="flex overflow-hidden items-start pt-4 w-full h-full">
            <ChatLeftSideBar />
            <ChatWindow />
        </div>
    );
}
