import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sky TV Retention Intelligence | Salesforce Media Cloud",
  description: "Next-gen predictive AI dashboard for subscriber retention intelligence",
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


