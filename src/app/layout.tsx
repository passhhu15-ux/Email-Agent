import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cold Email Agent",
  description: "Review and send personalized B2B emails",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
