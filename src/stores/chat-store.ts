import { Chat, Message } from "@/lib/storage/models";
import { create } from "zustand";

interface ChatState {
    chat: Chat | undefined;
    messages: Message[];
    setChat: (c: Chat) => void;
    setMessages: (m: Message[]) => void;
}

const useChatStore = create<ChatState>()((set) => ({
    chat: undefined,
    messages: [],
    setChat: (c) => set({ chat: c }),
    setMessages: (m) => set({ messages: m }),
}));

export { useChatStore };
