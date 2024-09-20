import type { Metadata } from "next";
import {Open_Sans} from "next/font/google";
import Navigation from "@/components/Navigation"
import "./globals.css";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

export const metadata: Metadata = {
  title: "Plane Scope",
  description: "App for booking flights",
};

const openSans = Open_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight:['400','700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${openSans.className}`}
      >
        <div className="container mx-auto">
          <Navigation/> 
          {children}
        </div>
      </body>
    </html>
  );
}
