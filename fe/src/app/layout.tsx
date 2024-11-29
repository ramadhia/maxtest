import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Header, ReactQueryClientProvider, Toaster } from "@/components";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<  {
  children: React.ReactNode;
}>) {
    return (
        <ReactQueryClientProvider>
            <html className="h-full bg-gray-100">
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
            >
                <Header></Header>
                <div className="min-h-full">
                    <main className="mx-auto max-w-2xl px-6 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                        {children}
                    </main>
                    <Toaster />
                </div>
            </body>
        </html>
        </ReactQueryClientProvider>
    );
}