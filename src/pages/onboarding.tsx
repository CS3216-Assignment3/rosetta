import { updateUserProfile } from "@/lib/auth";
import { useAuth } from "@/lib/auth/context";
import { updateUser } from "@/lib/storage/user";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        interface FormDataElements extends HTMLFormControlsCollection {
            displayName: HTMLInputElement;
            nativeLanguage: HTMLSelectElement;
        }

        e.preventDefault();

        const elements = e.currentTarget.elements as FormDataElements;

        if (user === undefined) {
            return console.log("error completing user profile");
        }

        // firestore
        const { error: updateUserError } = await updateUser(user.uid, {
            nativeLanguage: elements.nativeLanguage.value,
        });
        if (updateUserError !== undefined) {
            return console.log("error completing user profile");
        }

        // auth profile
        const { error: updateUserProfileError } = await updateUserProfile(
            user,
            { displayName: elements.displayName.value },
        );
        if (updateUserProfileError !== undefined) {
            return console.log("error completing user profile");
        }

        console.log("successfully complete user profile");
        if (router.query.editProfile === "1") {
            router.push("/lobby?section=profile");
        } else {
            router.push("/welcome");
        }
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-full h-full">
            <h1 className="text-3xl font-bold">
                Let's get to know{" "}
                <span className="text-rosetta-sienna">you better</span>!
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center w-1/4"
            >
                <label className="flex flex-col gap-1 w-full">
                    Name
                    <input
                        name="displayName"
                        className="rounded-lg border-gray-200 shadow-inner"
                    />
                </label>
                <label className="flex flex-col gap-1 w-full">
                    Native Language
                    <select
                        name="nativeLanguage"
                        className="rounded-lg border-gray-200 shadow-inner"
                    >
                        <option value="english">English</option>
                        <option value="german">German</option>
                        <option value="italian">Italian</option>
                    </select>
                </label>
                <button
                    type="submit"
                    className="py-4 px-8 w-full text-xl font-bold text-center rounded-lg duration-150 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
