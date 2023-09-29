import GoogleIcon from "@/components/ui/google-icon";
import { useToast } from "@/components/ui/use-toast";
import { signUp, signUpWithGoogle } from "@/lib/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUpPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        if (email === "" || password === "" || repassword === "") {
            toast({
                title: "Error Signing Up",
                description: "Empty Fields",
                duration: 2000,
            });
            return console.log("empty fields");
        }
        if (password !== repassword) {
            toast({
                title: "Error Signing Up",
                description: "Passwords do not match",
                duration: 2000,
            });
            return console.log("password not the same");
        }
        const { result, error } = await signUp(email, password);
        if (error) {
            toast({
                title: "Error Signing Up",
                description: "Something went wrong...",
                duration: 2000,
            });
            return console.log(error);
        }
        console.log(result);
        router.push("/onboarding");
    };

    const handleSignUpWithGoogle = async () => {
        const { result, error } = await signUpWithGoogle();
        if (error) {
            toast({
                title: "Error Signing Up",
                description: "Something went wrong...",
                duration: 2000,
            });
            return console.log(error);
        }
        console.log(result);
        router.push("/onboarding");
    };

    return (
        <div className="flex flex-col gap-8 items-center pt-12 h-full">
            <h1 className="text-3xl font-bold">
                Sign up to <span className="text-rosetta-sienna">Rosetta</span>.
            </h1>

            <div className="flex flex-col gap-8 items-center w-1/4 h-full">
                <button
                    onClick={handleSignUpWithGoogle}
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
                    onSubmit={handleSignUp}
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

                    <label className="flex flex-col gap-1 w-full">
                        Re-enter Password
                        <input
                            type="password"
                            onChange={(e) => setRepassword(e.target.value)}
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>

                    <button
                        type="submit"
                        className="py-4 px-8 w-full text-xl font-bold text-center rounded-lg duration-150 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-orange"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
