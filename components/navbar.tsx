import Link from "next/link";
import { Bell, Search, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <header className="bg-[#1B1A1A] mb-[2px]">
            <div className="flex h-20 items-center px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold mr-40"
                >
                    <Image
                        src="/assets/icons/main-logo-blue.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                    />
                </Link>
                <nav className="flex items-center h-full gap-10 font-light">
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
                <div className="ml-auto flex items-center gap-10">
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
                </div>
            </div>
        </header>
    );
}
