export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-8 items-center pt-12 h-full">
            <h1 className="text-3xl font-bold">
                Sign up to <span className="text-rosetta-sienna">Rosetta</span>.
            </h1>
            <div className="flex flex-col gap-8 items-center w-1/4 h-full">
                <button className="flex justify-center items-center p-4 w-full text-lg rounded-lg border border-gray-200 shadow">
                    Connect with Google
                </button>
                <div className="flex gap-2 items-center w-full">
                    <div className="w-full border-t border-gray-200"></div>
                    <p className="w-min">or</p>
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <form className="flex flex-col gap-4 items-center w-full">
                    <label className="flex flex-col gap-1 w-full">
                        Email
                        <input
                            type="email"
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                        Password
                        <input
                            type="password"
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                        Re-enter Password
                        <input
                            type="password"
                            className="rounded-lg border-gray-200 shadow-inner"
                        />
                    </label>
                </form>
                <button className="py-4 px-8 w-full text-xl font-bold text-center rounded-lg duration-300 ease-in-out hover:text-white text-rosetta-jet bg-rosetta-coral shadow-inset hover:shadow-inset2 hover:bg-rosetta-green">
                    Sign Up
                </button>
            </div>
        </div>
    );
}
