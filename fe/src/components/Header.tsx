'use client'

import Navbar from "@/components/Navbar";

import React from "react";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    const getHeaderText = () => {
        switch (pathname) {
            case '/':
                return 'Dashboard';
            case '/products':
                return 'Products';
            case '/carts':
                return 'Carts';
            default:
                return 'Page Not Found';
        }
    };

    return (
        <>
            <Navbar pathname={pathname}/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{getHeaderText()}</h1>
                </div>
            </header>
        </>
    )
}

export default Header