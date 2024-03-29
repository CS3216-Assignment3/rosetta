import GoogleIcon from "@/components/ui/google-icon";
import { useToast } from "@/components/ui/use-toast";
import { signIn, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignInPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        if (email === "" || password === "") {
            toast({
                variant: "destructive",
                title: "Error Signing In",
                description: "Empty Fields",
            });
            return console.log("empty fields");
        }
        const { result, error } = await signIn(email, password);
        if (error) {
            toast({
                variant: "destructive",
                title: "Error Signing In",
                description: "Something went wrong...",
            });
            return console.log(error);
        }
        console.log(result);
        router.push("/lobby?section=profile");
    };

    const handleSignInWithGoogle = async () => {
        const { result, error } = await signInWithGoogle();
        if (error) {
            toast({
                variant: "destructive",
                title: "Error Signing In",
                description: "Looks like you are new! Please sign up.",
            });
            return console.log(error);
        }
        console.log(result);
        router.push("/lobby?section=profile");
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 h-full">
            <h1 className="text-3xl font-bold">
                Sign in to <span className="text-rosetta-orange">Rosetta</span>.
            </h1>

            <div className="flex flex-col gap-8 items-center w-1/4 h-full">
                <button
                    onClick={handleSignInWithGoogle}
                    className="flex gap-2 justify-center items-center p-4 w-full text-lg rounded-lg border border-gray-200 shadow"
                >
                    <GoogleIcon />
                    Connect with Google
                </button>

                <div className="flex gap-2 items-center w-full">
                    <div className="w-full border-t border-gray-200"></div>
                    <p className="w-min">or</p>
                    <div className="w-full border-t border-gray-200"></div>
                </div>

                <form
                    onSubmit={handleSignIn}
                    className="flex flex-col gap-4 items-center w-full"
                >
                    <label className="flex flex-col gap-1 w-full">
                        Email
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>

                    <label className="flex flex-col gap-1 w-full">
                        Password
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>

                    <button
                        type="submit"
                        className="py-4 px-8 w-full text-xl font-bold text-center bg-gray-200 rounded-lg duration-150 ease-in-out hover:text-white shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
