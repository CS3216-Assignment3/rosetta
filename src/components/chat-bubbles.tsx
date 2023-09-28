export default function ChatBubbles({
    userBody,
    botBody,
}: {
    userBody: string;
    botBody: string;
}) {
    return (
        <>
            <p className="flex flex-col py-2 px-4 bg-rosetta-sienna text-white rounded-lg  rounded-br-none shadow max-w-[70%] self-end">
                {userBody}
            </p>
            <p className="flex flex-col py-2 px-4 bg-gray-200 rounded-lg rounded-bl-none shadow max-w-[70%] self-start">
                {botBody}
            </p>
        </>
    );
}
