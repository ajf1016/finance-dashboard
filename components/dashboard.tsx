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
        "portfolio"
    );

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 px-6 py-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-medium">
                            Good morning, Yashna!
                        </h1>
                        <p className="text-gray-400 font-light">
                            Evaluate Your Investment Performance
                        </p>
                    </div>

                    <InvestmentSummary />

                    <div className="mt-10">
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
