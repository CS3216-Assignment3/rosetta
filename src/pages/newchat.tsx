import { useAuth } from "@/lib/auth/context";
import { createChat } from "@/lib/storage/chat";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function NewChatPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        interface FormDataElements extends HTMLFormControlsCollection {
            language: HTMLSelectElement;
            proficiency: HTMLSelectElement;
            topic: HTMLSelectElement;
        }
        e.preventDefault();
        const elements = e.currentTarget.elements as FormDataElements;
        if (user === undefined) {
            return console.log("not signed in");
        }
        const { result, error } = await createChat(user.uid, {
            language: elements.language.value,
            proficiency: elements.proficiency.value,
            topic: elements.topic.value,
        });
        if (error !== undefined || result === undefined) {
            return console.log("error creating chat");
        }
        router.push(`/chat?id=${result.id}`);
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-full h-full">
            <h1 className="text-3xl font-bold">{`Let's start chatting!`}</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center w-1/4"
            >
                <label className="flex flex-col gap-1 w-full">
                    What language would you like to learn?
                    <select
                        name="language"
                        className="rounded-lg border-gray-200 shadow-inner"
                    >
                        <option value="english">English</option>
                        <option value="german">German</option>
                        <option value="spanish">Spanish</option>
                        <option value="chinese">Chinese</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1 w-full">
                    What is your proficiency with this language?
                    <select
                        name="proficiency"
                        className="rounded-lg border-gray-200 shadow-inner"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1 w-full">
                    What topic would you like to talk about?
                    <select
                        name="topic"
                        className="rounded-lg border-gray-200 shadow-inner"
                    >
                        <option value="food">Food</option>
                        <option value="sports">Sports</option>
                        <option value="art">Art</option>
                        <option value="gaming">Gaming</option>
                    </select>
                </label>

                <button
                    type="submit"
                    className="py-4 px-8 w-full text-xl font-bold text-center bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Start Chatting
                </button>
            </form>
        </div>
    );
}
