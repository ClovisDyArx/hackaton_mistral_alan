import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import logo from "../logo.png";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <nav className="flex items-center justify-between p-4 bg-background border-b">
          <div className="flex items-center">
            <Image src={logo} alt="App Logo" width={40} height={40} />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="font-geist-sans text-base font-medium">
              <Link href="/doctor/appointments">Next appointments</Link>
            </Button>
            <Button variant="ghost" asChild className="font-geist-sans text-base font-medium">
              <Link href="/doctor/reports">Reports</Link>
            </Button>
            <Button variant="ghost" asChild className="p-0">
              <Link href="/doctor/profile">
                <Avatar>
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
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
