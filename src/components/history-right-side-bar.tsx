import { useStore } from "@/stores/rosetta-store";

export default function HistoryRightSideBar() {
    const chat = useStore((state) => state.chat);

    return (
        <div className="flex flex-col items-center pt-12 w-1/3 h-full">
            <div className="flex flex-col gap-4 items-center p-4 w-3/4 bg-gray-200 rounded-lg shadow">
                <h1 className="w-full text-xl font-bold">Study Plan</h1>
                {chat?.plan.length !== 0 ? (
                    <ul className="w-full">
                        {chat?.plan.map((e, idx) => (
                            <li key={idx}>
                                {idx + 1}: {e.topic}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No study plan created</p>
                )}
            </div>
        </div>
    );
}
