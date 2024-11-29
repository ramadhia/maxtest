import Image from "next/image";
import mascot from "../../../../public/mascot_3_white.gif";
import React from "react";

export default function ProductNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-1/2 text-center space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
            <Image
                className="w-36 rounded-md"
                src={mascot}
                width={250}
                height={250}
                alt="Your Company"
            />
            <p className="text-gray-500">We couldn&apos;t find the product you&apos;re looking for.</p>
            <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                Back to Home
            </button>
        </div>
    )
}