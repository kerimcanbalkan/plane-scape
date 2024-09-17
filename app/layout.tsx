import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plane Scope",
  description: "App for booking flights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
