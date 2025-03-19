"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// API Endpoint
const API_URL = "http://localhost:8000/api/portfolio";

// Headers for API request (Replace `YOUR_ACCESS_TOKEN` with actual token)
const HEADERS = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
};

// Component
export default function InvestmentSummary() {
    const [investmentData, setInvestmentData] = useState([
        {
            title: "Current",
            label: "Investment Value",
            amount: "Loading...",
            change: "0%",
            changeType: "up",
            subLabel: "1D Return",
        },
        {
            title: "Initial",
            label: "Investment Value",
            amount: "Loading...",
            change: "0%",
            changeType: "up",
            subLabel: "Inception",
        },
        {
            title: "Best",
            label: "Performing Scheme",
            amount: "Loading...",
            change: "0%",
            changeType: "up",
            subLabel: "Inception",
        },
        {
            title: "Worst",
            label: "Performing Scheme",
            amount: "Loading...",
            change: "0%",
            changeType: "down",
            subLabel: "Inception",
        },
    ]);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    // Fetch Portfolio Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, { headers: HEADERS });
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();

                // Mapping API response to investment data format
                const formattedData = [
                    {
                        title: "Current",
                        label: "Investment Value",
                        amount: `₹${data.current_value.toLocaleString(
                            "en-IN"
                        )}`,
                        change: `${data.one_day_return.toFixed(2)}%`,
                        changeType: data.one_day_return >= 0 ? "up" : "down",
                        subLabel: "1D Return",
                    },
                    {
                        title: "Initial",
                        label: "Investment Value",
                        amount: `₹${data.initial_investment.toLocaleString(
                            "en-IN"
                        )}`,
                        change: `${data.growth_percentage.toFixed(1)}%`,
                        changeType: "up",
                        subLabel: "Inception",
                    },
                    {
                        title: "Best",
                        label: "Performing Scheme",
                        amount: data.best_performing_scheme,
                        change: `${data.best_performing_scheme_return}%`,
                        changeType: "up",
                        subLabel: "Inception",
                    },
                    {
                        title: "Worst",
                        label: "Performing Scheme",
                        amount: data.worst_performing_scheme,
                        change: `${data.worst_performing_scheme_return}%`,
                        changeType: "down",
                        subLabel: "Inception",
                    },
                ];

                setInvestmentData(formattedData);
            } catch (error) {
                console.error("Error fetching investment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {investmentData.map((item, index) => (
                <div
                    key={index}
                    className="bg-[#11283E] rounded-xl p-5 flex flex-col w-full h-auto sm:h-[120px] justify-between transition-all"
                >
                    {/* Top Section */}
                    <div className="flex items-start gap-2">
                        {/* Left Blue Bar */}
                        <div className="h-[40px] w-[3px] bg-[#B2EFFF] rounded-md"></div>

                        <div className="flex-1">
                            <div className="text-xs sm:text-sm text-gray-400 font-light">
                                {item.title}
                            </div>
                            <div className="text-sm sm:text-base font-light text-white leading-tight">
                                {item.label}
                            </div>
                        </div>

                        {/* Growth Section */}
                        <div className="flex flex-col items-end">
                            <div
                                className={`flex items-center font-medium ${
                                    item.changeType === "up"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                <Image
                                    src={
                                        item.changeType === "up"
                                            ? "/assets/icons/up.svg"
                                            : "/assets/icons/down.svg"
                                    }
                                    alt="Change Icon"
                                    width={16}
                                    height={16}
                                    className="mr-1"
                                />
                                <span className="text-xs sm:text-sm">
                                    {item.change}
                                </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400">
                                {item.subLabel}
                            </div>
                        </div>
                    </div>

                    {/* Amount Section */}

                    <div className="ml-3 text-sm sm:text-base font-medium text-white w-full">
                        {truncateText(item.amount, 25)}
                    </div>
                </div>
            ))}
        </div>
    );
}
