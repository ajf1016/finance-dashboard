"use client";

import { useState } from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { usePortfolioStore } from "@/lib/store";
import type { TimePeriod } from "@/lib/store";
import Image from "next/image";

// Time period buttons
const timePeriods: { id: TimePeriod; label: string }[] = [
    { id: "1M", label: "1M" },
    { id: "3M", label: "3M" },
    { id: "6M", label: "6M" },
    { id: "1Y", label: "1Y" },
    { id: "3Y", label: "3Y" },
    { id: "MAX", label: "MAX" },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
                <p className="text-sm font-medium">{data.formattedDate}</p>
                <p className="text-sm text-blue-400">
                    ₹{Math.round(data.value).toLocaleString("en-IN")}
                </p>
            </div>
        );
    }
    return null;
};

export default function PerformanceSummary() {
    const { selectedTimePeriod, performanceData, setSelectedTimePeriod } =
        usePortfolioStore();
    const [hoveredPoint, setHoveredPoint] = useState<any>(null);

    // Calculate values
    const currentValue =
        performanceData.length > 0
            ? performanceData[performanceData.length - 1].value
            : 0;
    const initialValue =
        performanceData.length > 0 ? performanceData[0].value : 0;
    const growth = currentValue - initialValue;
    const growthPercentage =
        initialValue > 0 ? (growth / initialValue) * 100 : 0;

    return (
        <div className="bg-[#1B1A1A] p-6" style={{ borderRadius: "10px" }}>
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>

            {/* Performance Summary Box */}
            <div
                className="bg-[#262626] p-4 mb-6"
                style={{ borderRadius: "10px", width: "max-content" }}
            >
                <div className="text-2xl font-bold">
                    ₹{Math.round(currentValue).toLocaleString("en-IN")}
                </div>
                <div className="flex items-center mt-1">
                    {growth >= 0 ? (
                        <Image
                            src={"/assets/icons/plus.svg"}
                            alt="Change Icon"
                            width={16}
                            height={16}
                            className="mr-1"
                        />
                    ) : (
                        "-"
                    )}
                    <span className="text-gray-400">
                        ₹{Math.abs(Math.round(growth)).toLocaleString("en-IN")}
                    </span>
                    <span className="mx-2 text-gray-500">|</span>
                    <span
                        className={`${
                            growth >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {Math.abs(growthPercentage).toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Graph Container */}
            <div className="h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={performanceData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        onMouseMove={(data) => {
                            if (data.activePayload) {
                                setHoveredPoint(data.activePayload[0].payload);
                            }
                        }}
                    >
                        {/* Dashed Grid Lines */}
                        <defs>
                            <pattern
                                id="gridLines"
                                width="100"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <line
                                    x1="0"
                                    y1="40"
                                    x2="100%"
                                    y2="40"
                                    stroke="#374151"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#gridLines)"
                        />

                        {/* Axes */}
                        <XAxis
                            dataKey="formattedDate"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            interval="preserveStartEnd"
                            minTickGap={30}
                        />
                        <YAxis
                            hide
                            domain={["dataMin - 100000", "dataMax + 100000"]}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#6B7280",
                                strokeWidth: 1,
                                strokeDasharray: "5 5",
                            }}
                        />

                        {/* Graph Line (No Background Fill) */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#2563EB"
                            strokeWidth={2}
                            fill="none" // Removed gradient fill
                            activeDot={{
                                r: 6,
                                fill: "#2563EB",
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>

                {/* Hovered Point Indicator */}
                {hoveredPoint && (
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>
                )}
            </div>

            {/* Time Period Buttons */}
            <div className="flex justify-center mt-6 space-x-2">
                {timePeriods.map((period) => (
                    <button
                        style={{
                            borderRadius: "5px",
                        }}
                        key={period.id}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                            selectedTimePeriod === period.id
                                ? "bg-blue-600 text-white"
                                : " hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedTimePeriod(period.id)}
                    >
                        {period.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
