"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import InvestmentSummary from "@/components/investment-summary";
import TabNavigation from "@/components/tab-navigation";
import PortfolioComposition from "@/components/portfolio-composition";
import PerformanceMetrics from "@/components/performance-metrics";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"performance" | "portfolio">(
        "performance"
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#171616] text-white">
            <Navbar />
            <div className="flex flex-1 min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <div className="mb-2 px-6 pt-10">
                        <h1 className="text-2xl font-medium">
                            Good morning, Yashna!
                        </h1>
                        <p className="text-gray-400 font-light">
                            Evaluate Your Investment Performance
                        </p>
                    </div>

                    <InvestmentSummary />

                    <div className="px-6 pt-10">
                        <TabNavigation
                            activeTab={activeTab}
                            onTabChange={(tab) =>
                                setActiveTab(tab as "performance" | "portfolio")
                            }
                        />

                        {activeTab === "performance" ? (
                            <PerformanceMetrics />
                        ) : (
                            <PortfolioComposition />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
