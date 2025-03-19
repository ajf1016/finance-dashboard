import Image from "next/image";

// Sample investment data
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-2">
            {investmentData.map((item, index) => (
                <div
                    key={index}
                    className="bg-[#11283E] rounded-xl p-5 flex flex-col h-auto sm:h-[120px] justify-between transition-all sm:p-2"
                >
                    {/* Top Section */}
                    <div className="flex items-start gap-2">
                        {/* Left Blue Bar */}
                        <div className="h-[30px] w-[3px] bg-[#B2EFFF] rounded-md"></div>

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
                        {item.amount}
                    </div>
                </div>
            ))}
        </div>
    );
}
