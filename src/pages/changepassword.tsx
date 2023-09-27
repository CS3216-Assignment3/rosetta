import { updateUserPassword } from "@/lib/auth";
import { useAuth } from "@/lib/auth/context";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";

export default function ChangePasswordPage() {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user === undefined) {
            router.push("/");
        }
    }, [loading, user]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        interface FormDataElements extends HTMLFormControlsCollection {
            password: HTMLInputElement;
            repassword: HTMLInputElement;
        }

        e.preventDefault();

        const elements = e.currentTarget.elements as FormDataElements;
        const password = elements.password.value;
        const repassword = elements.repassword.value;

        if (password !== repassword) {
            return console.log("passwords do not match");
        }

        if (user === undefined) {
            return console.log("not signed in");
        }

        const { error } = await updateUserPassword(user, password);
        if (error !== undefined) {
            return console.log("error changing passwords");
        }

        console.log("successfully changed passwords");
        router.push("/lobby?section=profile");
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 w-full h-full">
            <h1 className="text-3xl font-bold">Change Password</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center w-1/4"
            >
                <label className="flex flex-col gap-1 w-full">
                    New Password
                    <input
                        name="displayName"
                        className="rounded-lg border-gray-200 shadow-inner"
                    />
                </label>
                <label className="flex flex-col gap-1 w-full">
                    Confirm Password
                    <input
                        name="displayName"
                        className="rounded-lg border-gray-200 shadow-inner"
                    />
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
