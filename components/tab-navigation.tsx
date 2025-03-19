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
            <div className="flex space-x-20">
                <button
                    onClick={() => onTabChange("performance")}
                    className={`pb-2 font-light ${
                        activeTab === "performance"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    Performance Metrics
                </button>
                <button
                    onClick={() => onTabChange("portfolio")}
                    className={`pb-2 font-light ${
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
