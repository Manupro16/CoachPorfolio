import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import NavBar from "@/app/NavBar";

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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme appearance='dark'>
            <NavBar />
            <main>
                {children}
            </main>
        </Theme>
      </body>
    </html>
  );
}
