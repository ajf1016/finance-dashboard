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
        <div
            className="bg-[#1B1A1A] text-white p-6"
            style={{ borderRadius: "1rem" }}
        >
            <h2 className="text-2xl font-medium mb-6">Sector Allocation</h2>

            <div className="flex flex-col gap-3">
                {/* First row - Financial and Healthcare */}
                <div className="flex gap-3">
                    {/* Financial - Large Card (60%) */}
                    <div
                        className={`${sectors[0].color} rounded-xl p-6 flex-grow relative`}
                        style={{ flex: "0.7" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[0].name}
                            </h3>
                            <p className="text-gray-700">{sectors[0].value}</p>
                        </div>
                        <div className="mt-24">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[0].percentage}
                            </p>
                        </div>
                    </div>

                    {/* Healthcare - Medium Card (40%) */}
                    <div
                        className={`${sectors[1].color} rounded-xl p-6 flex-grow`}
                        style={{ flex: "0.3" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[1].name}
                            </h3>
                            <p className="text-gray-700">{sectors[1].value}</p>
                        </div>
                        <div className="mt-24">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[1].percentage}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second row - Technology, Consumer Goods, Energy, Other Sectors */}
                <div className="flex gap-3">
                    {/* Technology - Slightly Larger Card (30%) */}
                    <div
                        className={`${sectors[2].color} rounded-xl p-6 flex-grow`}
                        style={{ flex: "0.5" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[2].name}
                            </h3>
                            <p className="text-gray-700">{sectors[2].value}</p>
                        </div>
                        <div className="mt-16">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[2].percentage}
                            </p>
                        </div>
                    </div>

                    {/* Last Three Equal Cards (23.33% each) */}
                    <div
                        className={`${sectors[3].color} rounded-xl p-6 flex-grow`}
                        style={{ flex: "0.23333" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[3].name}
                            </h3>
                            <p className="text-gray-700">{sectors[3].value}</p>
                        </div>
                        <div className="mt-16">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[3].percentage}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${sectors[4].color} rounded-xl p-6 flex-grow`}
                        style={{ flex: "0.23333" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[4].name}
                            </h3>
                            <p className="text-gray-700">{sectors[4].value}</p>
                        </div>
                        <div className="mt-16">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[4].percentage}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${sectors[5].color} rounded-xl p-6 flex-grow`}
                        style={{ flex: "0.23333" }}
                    >
                        <div>
                            <h3 className="text-gray-800 font-medium">
                                {sectors[5].name}
                            </h3>
                            <p className="text-gray-700">{sectors[5].value}</p>
                        </div>
                        <div className="mt-16">
                            <p className="text-3xl font-medium text-gray-800">
                                {sectors[5].percentage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
