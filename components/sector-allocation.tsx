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
    IT: "bg-[#9BB0C7]",
    Financials: "bg-[#ADB8CF]",
    Energy: "bg-[#C6C4D8]",
    Healthcare: "bg-[#DAD3E1]",
    "Consumer Goods": "bg-[#F8F3F5]",
    "Other Sectors": "bg-[#EFE7EC]",
    Technology: "bg-[#9BB0C7]",
};

// Type definition for inner card data
type InnerCardData = {
    [key: string]: { name: string; value: string; percentage: string }[];
};

// Inner card dummy data
const INNER_CARD_DATA: InnerCardData = {
    Technology: [
        { name: "HDFC Bank", value: "₹78,000", percentage: "40%" },
        { name: "ICICI Bank", value: "₹58,500", percentage: "30%" },
        { name: "Kotak Mahindra Bank", value: "₹39,000", percentage: "20%" },
        { name: "Bajaj Finance", value: "₹19,500", percentage: "10%" },
    ],
    Healthcare: [
        { name: "Apollo Hospitals", value: "₹30,000", percentage: "36%" },
        { name: "Dr. Reddy's Labs", value: "₹25,000", percentage: "30%" },
        { name: "Sun Pharma", value: "₹18,250", percentage: "22%" },
        { name: "Cipla", value: "₹10,000", percentage: "12%" },
    ],
};

export default function SectorAllocation() {
    const [sectors, setSectors] = useState<
        { name: string; value: string; percentage: string; color: string }[]
    >([]);
    const [hoverStates, setHoverStates] = useState({
        firstCard: true,
        secondCard: true,
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, { headers: HEADERS });
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                const formattedSectors = data.allocations.map(
                    (sector: {
                        sector: string;
                        invested_amount: number;
                        percentage: number;
                    }) => ({
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
                // Set some dummy data for development
                setSectors([
                    {
                        name: "Financials",
                        value: "₹1,95,000",
                        percentage: "34%",
                        color: "bg-[#ADB8CF]",
                    },
                    {
                        name: "Healthcare",
                        value: "₹83,250",
                        percentage: "14.5%",
                        color: "bg-[#DAD3E1]",
                    },
                    {
                        name: "Technology",
                        value: "₹1,11,000",
                        percentage: "19%",
                        color: "bg-[#9BB0C7]",
                    },
                    {
                        name: "Consumer Goods",
                        value: "₹55,500",
                        percentage: "9.5%",
                        color: "bg-[#F8F3F5]",
                    },
                    {
                        name: "Energy",
                        value: "₹55,500",
                        percentage: "9.5%",
                        color: "bg-[#C6C4D8]",
                    },
                    {
                        name: "Other Sectors",
                        value: "₹55,500",
                        percentage: "9.5%",
                        color: "bg-[#EFE7EC]",
                    },
                ]);
            }
        };

        fetchData();
    }, []);

    const handleMouseEnter = (card: string) => {
        setHoverStates((prev) => ({
            ...prev,
            [card]: true,
        }));
    };

    const handleMouseLeave = (card: string) => {
        setHoverStates((prev) => ({
            ...prev,
            [card]: false,
        }));
    };

    return (
        <div className="bg-[#1B1A1A] text-white p-6 rounded-2xl">
            <h2
                className="text-2xl font-light mb-6"
                style={{
                    color:
                        hoverStates.firstCard || hoverStates.secondCard
                            ? "#003a74"
                            : "#fff",
                }}
            >
                Sector Allocation
            </h2>

            <div className="flex flex-col gap-3">
                {/* First row - Top 2 Sectors */}
                {sectors.length > 1 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div
                            className={`${sectors[0].color} rounded-xl flex-grow relative overflow-hidden `}
                            style={{
                                flex: "0.7",
                                backgroundColor: hoverStates.firstCard
                                    ? "#003a74"
                                    : "#9BB0C7",
                            }}
                            onMouseEnter={() => handleMouseEnter("firstCard")}
                            onMouseLeave={() => handleMouseLeave("firstCard")}
                        >
                            {/* Main card content */}
                            <div
                                className={`transition-opacity duration-400 p-6`}
                                // style={{
                                //     padding: hoverStates.firstCard
                                //         ? 0
                                //         : "1.5rem",
                                // }}
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

                            {/* Inner card content */}
                            <div
                                className={`transition-opacity duration-400 ${
                                    hoverStates.firstCard
                                        ? "opacity-100"
                                        : "opacity-0 absolute"
                                }`}
                                style={{
                                    padding: 0,
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <div
                                    className="grid grid-cols-4 gap-[4px] h-full w-full"
                                    style={{
                                        padding: 0,
                                    }}
                                >
                                    {INNER_CARD_DATA[sectors[0]?.name]?.map(
                                        (item, index) => {
                                            let colSpan, rowSpan;
                                            if (index === 0) {
                                                colSpan = "col-span-3";
                                                rowSpan = "row-span-1";
                                            } else if (index === 1) {
                                                colSpan = "col-span-1";
                                                rowSpan = "row-span-1";
                                            } else if (index === 2) {
                                                colSpan = "col-span-2";
                                                rowSpan = "row-span-1";
                                            } else {
                                                colSpan = "col-span-2";
                                                rowSpan = "row-span-1";
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className={`${colSpan} ${rowSpan} bg-[#466e98] p-4 flex flex-col justify-between`}
                                                >
                                                    <div>
                                                        <h4 className="text-gray-800 font-medium text-sm sm:text-base">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-gray-700 text-xs sm:text-sm">
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                    <p className="text-xl sm:text-2xl font-medium text-gray-800 text-right">
                                                        {item.percentage}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${sectors[1].color} rounded-xl p-6 flex-grow relative overflow-hidden`}
                            style={{ flex: "0.3" }}
                            onMouseEnter={() => handleMouseEnter("secondCard")}
                            onMouseLeave={() => handleMouseLeave("secondCard")}
                        >
                            {/* Main card content */}
                            <div
                                // className={`transition-opacity duration-300 ${
                                //     hoverStates.secondCard
                                //         ? "opacity-0 absolute"
                                //         : "opacity-100"
                                // }`}
                                className="transition-opacity duration-300 opacity-100"
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

                            {/* Inner card content */}
                            {/* <div
                                className={`transition-opacity duration-300 ${
                                    hoverStates.secondCard
                                        ? "opacity-100"
                                        : "opacity-0 absolute"
                                }`}
                            >
                                <div className="grid grid-cols-2 gap-2 h-full">
                                    {INNER_CARD_DATA[sectors[1]?.name]?.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col justify-between"
                                            >
                                                <div>
                                                    <h4 className="text-gray-800 font-medium text-sm sm:text-base">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-gray-700 text-xs sm:text-sm">
                                                        {item.value}
                                                    </p>
                                                </div>
                                                <p className="text-xl sm:text-2xl font-medium text-gray-800">
                                                    {item.percentage}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div> */}
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
