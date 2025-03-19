"use client";
import { useEffect, useState } from "react";

// API Endpoint
const API_URL = "http://localhost:8000/api/portfolio/sector-allocation";

// Bearer Token for Authentication (Replace with actual token)
const HEADERS = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
};

// Color mapping for sectors
const SECTOR_COLORS: { [key: string]: string } = {
    IT: "bg-[#C6C2E9]",
    Financials: "bg-[#94B5D8]",
    Energy: "bg-[#E7DBE4]",
    Healthcare: "bg-[#BFD7E3]",
    "Consumer Goods": "bg-[#D8C9DB]",
    "Other Sectors": "bg-[#EFE7EC]",
};

export default function SectorAllocation() {
    const [sectors, setSectors] = useState<
        { name: string; value: string; percentage: string; color: string }[]
    >([]);

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, { headers: HEADERS });
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                const formattedSectors = data.allocations.map(
                    (sector: any) => ({
                        name: sector.sector,
                        value: `₹${sector.invested_amount.toLocaleString(
                            "en-IN"
                        )}`,
                        percentage: `${sector.percentage}%`,
                        color: SECTOR_COLORS[sector.sector] || "bg-gray-700",
                    })
                );

                setSectors(formattedSectors);
            } catch (error) {
                console.error("Error fetching sector data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-[#1B1A1A] text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-medium mb-6 text-white">
                Sector Allocation
            </h2>

            <div className="flex flex-col gap-3">
                {/* First row - Top 2 Sectors */}
                {sectors.length > 1 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div
                            className={`${sectors[0].color} rounded-xl p-6 flex-grow`}
                            style={{ flex: "0.7" }}
                        >
                            <h3 className="text-gray-800 font-medium text-lg sm:text-xl">
                                {sectors[0].name}
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                {sectors[0].value}
                            </p>
                            <p className="text-3xl font-medium text-gray-800 mt-10 sm:mt-20">
                                {sectors[0].percentage}
                            </p>
                        </div>

                        <div
                            className={`${sectors[1].color} rounded-xl p-6 flex-grow`}
                            style={{ flex: "0.3" }}
                        >
                            <h3 className="text-gray-800 font-medium text-lg sm:text-xl">
                                {sectors[1].name}
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                {sectors[1].value}
                            </p>
                            <p className="text-3xl font-medium text-gray-800 mt-10 sm:mt-20">
                                {sectors[1].percentage}
                            </p>
                        </div>
                    </div>
                )}

                {/* Second row - Remaining Sectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sectors.slice(2).map((sector, index) => (
                        <div
                            key={index}
                            className={`${sector.color} rounded-xl p-6`}
                        >
                            <h3 className="text-gray-800 font-medium text-lg sm:text-xl">
                                {sector.name}
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                {sector.value}
                            </p>
                            <p className="text-3xl font-medium text-gray-800 mt-10 sm:mt-20">
                                {sector.percentage}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
