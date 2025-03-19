import Image from "next/image";

// Sample data structure (Replace with API data)
const investmentData = [
    {
        title: "Current",
        label: "Investment Value",
        amount: "₹5,75,000",
        change: "+0.6%",
        changeType: "up",
        subLabel: "1D Return",
    },
    {
        title: "Initial",
        label: "Investment Value",
        amount: "₹5,00,000",
        change: "+15%",
        changeType: "up",
        subLabel: "Inception",
    },
    {
        title: "Best",
        label: "Performing Scheme",
        amount: "ICICI Prudential Midcap Fund",
        change: "+19%",
        changeType: "up",
        subLabel: "Inception",
    },
    {
        title: "Worst",
        label: "Performing Scheme",
        amount: "Axis Flexi Cap Fund",
        change: "-5%",
        changeType: "down",
        subLabel: "Inception",
    },
];

export default function InvestmentSummary() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px]">
            {investmentData.map((item, index) => (
                <div
                    key={index}
                    className="bg-[#0F172A] rounded-lg p-5 flex flex-col w-[300px] h-[104px] justify-between"
                    style={{ borderRadius: "5px" }}
                >
                    {/* Top Section */}
                    <div className="flex items-start gap-2">
                        {/* Left Blue Bar - Aligned */}
                        <div className="h-[30px] w-[3px] bg-blue-500 rounded-md"></div>

                        <div className="flex-1">
                            <div className="text-xs text-gray-400 font-light">
                                {item.title}
                            </div>
                            <div className="text-sm font-light text-white leading-tight">
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
                                <span>{item.change}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                {item.subLabel}
                            </div>
                        </div>
                    </div>

                    {/* Amount Section - Full Width */}
                    <div className="ml-3 text-sm font-medium text-white w-full">
                        {item.amount}
                    </div>
                </div>
            ))}
        </div>
    );
}
