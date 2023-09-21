import NavBar from "@/components/navbar";

export default function SignUpPage() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="flex flex-col gap-8 items-center p-20 rounded-lg border">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            Email
                            <input
                                type="email"
                                className="rounded-lg border-gray-200"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            Password
                            <input
                                type="password"
                                className="rounded-lg border-gray-200"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            Re-enter Password
                            <input
                                type="password"
                                className="rounded-lg border-gray-200"
                            />
                        </label>
                    </div>
                    <button className="p-4 w-full text-xl font-bold rounded-lg duration-300 ease-in-out bg-rosetta-orange text-rosetta-white hover:bg-rosetta-navy">
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
}
