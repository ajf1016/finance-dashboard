"use client";

import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Image from "next/image";

// API Endpoint
const API_URL = "http://127.0.0.1:8000/api/portfolio/stock-allocation";

// Bearer Token for Authentication (Replace with actual token)
const HEADERS = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
};

// Available Time Periods
const timePeriods = ["1M", "3M", "6M", "1Y", "3Y", "MAX"];

export default function PerformanceSummary() {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState("1M");
    const [graphData, setGraphData] = useState([]);
    const [summary, setSummary] = useState({
        total_value: 0,
        change_amount: 0,
        change_percentage: 0,
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}?period=${selectedTimePeriod}`,
                    { headers: HEADERS }
                );
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();

                // Format data for the graph
                const formattedData = data.history.map((point: any) => ({
                    date: new Date(point.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                    }),
                    value: point.value,
                }));

                setGraphData(formattedData);
                setSummary({
                    total_value: data.total_value,
                    change_amount: data.change_amount,
                    change_percentage: data.change_percentage,
                });
            } catch (error) {
                console.error("Error fetching graph data:", error);
            }
        };

        fetchData();
    }, [selectedTimePeriod]);

    return (
        <div className="bg-[#1B1A1A] p-6 rounded-xl">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4 text-white">
                Performance Summary
            </h2>

            {/* Performance Summary Box */}
            <div
                className="bg-[#262626] p-3 mb-6 px-5 rounded-md  max-w-xs"
                style={{ borderRadius: "5px", width: "max-content" }}
            >
                <div className="text-xl font-medium text-white">
                    ₹{summary.total_value.toLocaleString("en-IN")}
                </div>
                <div className="flex items-center mt-1">
                    <Image
                        src={
                            summary.change_amount >= 0
                                ? "/assets/icons/plus.svg"
                                : "/assets/icons/down.svg"
                        }
                        alt="Change Icon"
                        width={16}
                        height={16}
                        className="mr-1"
                    />
                    <span
                        className={`text-sm ${
                            summary.change_amount >= 0
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        ₹
                        {Math.abs(summary.change_amount).toLocaleString(
                            "en-IN"
                        )}
                    </span>
                    <span
                        className={`text-sm mx-2 ${
                            summary.change_percentage >= 0
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        |
                    </span>
                    <span
                        className={`text-sm ${
                            summary.change_percentage >= 0
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {Math.abs(summary.change_percentage).toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Graph Container */}
            <div className="h-[300px] relative w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={graphData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                        {/* Grid Lines */}
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
                                    strokeDasharray="5 5"
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
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            minTickGap={50}
                            dy={10}
                        />
                        <YAxis hide />

                        {/* Tooltip */}
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
                                            <p className="text-sm font-medium">
                                                {data.date}
                                            </p>
                                            <p className="text-sm text-blue-400">
                                                ₹
                                                {Math.round(
                                                    data.value
                                                ).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            cursor={{ stroke: "#6B7280", strokeWidth: 1 }}
                        />

                        {/* Graph Line */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#2563EB"
                            strokeWidth={2}
                            fill="none"
                            activeDot={{
                                r: 6,
                                fill: "#2563EB",
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Time Period Buttons */}
            <div className="flex justify-center mt-6 flex-wrap gap-2">
                {timePeriods.map((period) => (
                    <button
                        key={period}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                            selectedTimePeriod === period
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedTimePeriod(period)}
                        style={{
                            borderRadius: "4px",
                        }}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    );
}
