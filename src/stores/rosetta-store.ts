import { Chat, Message } from "@/lib/storage/models";
import { create } from "zustand";

interface RosettaState {
    chats: Chat[];
    setChats: (c: Chat[]) => void;
    chat: Chat | undefined;
    setChat: (c: Chat) => void;
    messages: Message[];
    setMessages: (m: Message[]) => void;
}

const useStore = create<RosettaState>()((set) => ({
    chats: [],
    setChats: (c) => set({ chats: c }),
    chat: undefined,
    setChat: (c) => set({ chat: c }),
    messages: [],
    setMessages: (m) => set({ messages: m }),
}));

export { useStore };
