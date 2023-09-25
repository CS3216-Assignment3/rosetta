export default function ChatPage() {
    return (
        <div className="flex overflow-hidden flex-col items-center pt-4 w-full h-full flex-start">
            <div
                id="chat-window"
                className="flex overflow-hidden flex-col gap-4 items-center p-4 w-1/3 h-full bg-white rounded-t-lg border border-b-0 shadow scroll-smooth"
            >
                <div
                    id="chat-messages"
                    className="flex overflow-y-auto flex-col gap-4 w-full h-full no-scrollbar"
                >
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-rosetta-sienna text-white rounded-lg  rounded-br-none shadow max-w-[70%] self-end">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-rosetta-purple text-white rounded-lg  rounded-br-none shadow max-w-[70%] self-end">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-rosetta-purple text-white rounded-lg  rounded-br-none shadow max-w-[70%] self-end">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        hello?
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-rosetta-purple text-white rounded-lg  rounded-br-none shadow max-w-[70%] self-end">
                        hello world.
                    </p>
                    <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                        hello?
                    </p>
                </div>
                <form className="flex gap-4 items-center w-full h-min">
                    <input
                        type="text"
                        placeholder="type message here"
                        className="w-full rounded-lg border-gray-200 shadow-inner"
                    />
                    <button
                        type="submit"
                        className="rounded-full w-[30px] h-[30px] bg-rosetta-sienna"
                    ></button>
                </form>
            </div>
        </div>
    );
}
