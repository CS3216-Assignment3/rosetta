import HistoryLeftSideBar from "@/components/history-left-side-bar";
import HistoryWindow from "@/components/history-window";

export default function HistoryPage() {
    return (
        <div className="flex overflow-hidden items-start pt-4 w-full h-full">
            <HistoryLeftSideBar />
            <HistoryWindow />
        </div>
    );
}
