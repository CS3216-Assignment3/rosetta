import { useAuth } from "@/lib/auth/context";
import { getChatsByUser, updateReadOnlyChat } from "@/lib/storage/chat";
import { Chat } from "@/lib/storage/models";
import { useStore } from "@/stores/rosetta-store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HistoryLeftSideBar() {
    const { loading, user } = useAuth();
    const chat = useStore((state) => state.chat);

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-1/3 h-full">
            <div className="flex flex-col gap-4 w-3/4">
                <h1 className="py-2 px-4 text-xl font-bold rounded-lg bg-rosetta-coral">
                    Current Chat
                </h1>
                <div className="flex justify-between items-center w-full">
                    <div>
                        <p className="font-bold">{chat?.botName}</p>
                        <p className="capitalize">
                            {chat?.language} ({chat?.proficiency}) |{" "}
                            {chat?.topic}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
