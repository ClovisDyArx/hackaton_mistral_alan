import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import logo from "../logo.png";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, BookOpenIcon } from "@heroicons/react/24/solid";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center justify-between p-4 bg-background border-b shadow-sm">
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="App Logo" width={45} height={45} className="rounded-md" />
            <span className="font-geist-sans text-xl font-bold text-primary">Hugeía</span>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" asChild className="font-geist-sans text-base font-medium hover:bg-secondary">
              <Link href="/patient/submit" className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4" />
                <span>Make an appointment</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="font-geist-sans text-base font-medium hover:bg-secondary">
              <Link href="/patient/care-guide" className="flex items-center space-x-2">
                <BookOpenIcon className="w-4 h-4" />
                <span>Care guide</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="p-1 hover:bg-secondary rounded-full">
              <Link href="/patient/profile">
                <Avatar className="border-2 border-primary">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
