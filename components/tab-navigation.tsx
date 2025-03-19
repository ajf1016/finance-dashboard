"use client";

interface TabNavigationProps {
    activeTab: "performance" | "portfolio";
    onTabChange: (tab: string) => void;
}

export default function TabNavigation({
    activeTab,
    onTabChange,
}: TabNavigationProps) {
    return (
        <div className="border-b border-gray-800 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-start sm:space-x-10 space-y-3 sm:space-y-0">
                <button
                    onClick={() => onTabChange("performance")}
                    className={`pb-2 font-light transition ${
                        activeTab === "performance"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    Performance Metrics
                </button>
                <button
                    onClick={() => onTabChange("portfolio")}
                    className={`pb-2 font-light transition ${
                        activeTab === "portfolio"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    Portfolio Composition
                </button>
            </div>
        </div>
    );
}
