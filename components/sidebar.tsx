"use client";

import { Radius } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { name: "PHA" },
    { name: "Fund Analysis" },
    { name: "Holdings" },
    { name: "Transactions" },
];

export default function Sidebar() {
    const [tab, setTab] = useState("PHA");

    return (
        <aside className="hidden lg:flex w-56 bg-[#1B1A1A] min-h-screen flex flex-col">
            <div className="flex h-full flex-col">
                <nav className="flex-1 space-y-2 px-6 pt-10">
                    {navLinks.map((link) => (
                        <button
                            style={{ borderRadius: "0.3rem" }}
                            key={link.name}
                            onClick={() => setTab(link.name)} // Set active tab on click
                            className={`rounded-md w-full text-left flex items-center px-4 py-3 text-gray-400 transition ${
                                tab === link.name
                                    ? "bg-gray-800 text-white font-medium"
                                    : "hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
