import Link from "next/link";
import { Bell, Search, Users, LogOut, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="bg-[#1B1A1A] mb-[2px]">
            <div className="flex h-20 items-center px-6">
                {/* Logo */}
                <Link href="/" className="hidden md:flex flex items-center">
                    <Image
                        src="/assets/icons/main-logo-blue.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-8 w-8 md:h-10 md:w-10"
                    />
                </Link>
                <nav className="hidden md:flex items-center space-x-8 h-full gap-10 font-light ml-10 md:ml-40">
                    <Link href="/">Home</Link>
                    <Link
                        href="/portfolio"
                        className={`relative text-white hover:text-gray-300 flex items-center h-full ${styles.active}`}
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/mutual-funds"
                        className="text-gray-100 hover:text-white"
                    >
                        Mutual Funds
                    </Link>
                    <Link
                        href="/tools"
                        className="text-gray-100 hover:text-white"
                    >
                        Tools
                    </Link>
                    <Link
                        href="/transactions"
                        className="text-gray-100 hover:text-white"
                    >
                        Transactions
                    </Link>
                </nav>
                <div className="hidden lg:flex ml-auto flex items-center gap-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-100 hover:text-white"
                    >
                        <Image
                            src="/assets/icons/search.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-100 hover:text-white"
                    >
                        <Image
                            src="/assets/icons/notification.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-100 hover:text-white"
                    >
                        <Image
                            src="/assets/icons/user.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-100 hover:text-white"
                    >
                        <Image
                            src="/assets/icons/logout.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                            // className="h-5 w-5"
                        />
                    </Button>
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden absolute top-16 left-0 w-full bg-[#1B1A1A] shadow-md z-50">
                    <Link
                        href="/"
                        className="md:flex flex items-center ml-10 mt-5"
                    >
                        <Image
                            src="/assets/icons/main-logo-blue.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10"
                        />
                    </Link>
                    <ul className="flex flex-col space-y-4 px-6 py-4">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Portfolio", href: "/portfolio" },
                            { name: "Mutual Funds", href: "/mutual-funds" },
                            { name: "Tools", href: "/tools" },
                            { name: "Transactions", href: "/transactions" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-gray-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Icons */}

                        <div className="flex justify-center items-center space-x-6 mt-4">
                            {["search", "notification", "user", "logout"].map(
                                (icon) => (
                                    <Image
                                        key={icon}
                                        src={`/assets/icons/${icon}.svg`}
                                        alt={icon}
                                        width={24}
                                        height={24}
                                        className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                                    />
                                )
                            )}
                        </div>
                    </ul>
                </nav>
            )}
        </header>
    );
}
