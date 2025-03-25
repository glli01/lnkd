import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lnkd",
  description: "A linkedin games calc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
