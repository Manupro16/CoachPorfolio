import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import NavBar from "@/app/NavBar";
import FooterSection from "@/app/FooterSection";
import React from "react";
import Providers from '@/components/Providers';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

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
    title: "Chuy Vera - Professional Football Coach",
    description: "Official portfolio and showcase of Chuy Vera's career and achievements.",
};

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
            <NavBar/>
            <main>{children}</main>
            <FooterSection/>
        </Providers>
        </body>
        </html>
    );
}
