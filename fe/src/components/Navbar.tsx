'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";

import numisroad from "../../public/logo_numisroad_white.png";
import {Badge} from "@/components/ui/badge";
import {useCartStore} from "@/store/useCartStore";

interface NavbarProps {
    pathname: string;
}
export default function Navbar({
    pathname
}: NavbarProps) {
    const { cartItems } = useCartStore();
    const totalQty: number = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    const isActive = (r: string) : string => {
        return pathname === r ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    }

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <Image className="w-35" src={numisroad} width={100} height={150}
                                   alt="Your Company"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/"
                                      className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/')}`}
                                      aria-current="page">Dashboard</Link>
                                <Link href="/products"
                                      className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/products')}`}>Products</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link href={`/carts`}
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                                </svg>
                                <Badge className="absolute top-1 left-7 bg-green-500 px-1 text-white">{totalQty}</Badge>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}