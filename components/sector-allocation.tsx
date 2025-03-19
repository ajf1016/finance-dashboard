"use client";
import React from "react";

export default function SectorAllocation() {
    const sectors = [
        {
            name: "Financial",
            value: "₹1,95,000",
            percentage: "34%",
            color: "bg-[#94B5D8]",
        },
        {
            name: "Healthcare",
            value: "₹83,250",
            percentage: "14.5%",
            color: "bg-[#BFD7E3]",
        },
        {
            name: "Technology",
            value: "₹1,11,000",
            percentage: "19%",
            color: "bg-[#C6C2E9]",
        },
        {
            name: "Consumer Goods",
            value: "₹55,500",
            percentage: "9.5%",
            color: "bg-[#D8C9DB]",
        },
        {
            name: "Energy",
            value: "₹55,500",
            percentage: "9.5%",
            color: "bg-[#E7DBE4]",
        },
        {
            name: "Other Sectors",
            value: "₹55,500",
            percentage: "9.5%",
            color: "bg-[#EFE7EC]",
        },
    ];

    return (
        <div className="bg-[#1B1A1A] text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-medium mb-6 text-white">
                Sector Allocation
            </h2>

            <div className="flex flex-col gap-3">
                {/* First row - Financial and Healthcare */}
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

                {/* Second row - Technology, Consumer Goods, Energy, Other Sectors */}
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
