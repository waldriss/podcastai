import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/root/Providers";
import ServerAuthProvider from "@/components/root/ServerAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quoteai",
  description: "Generate your quote using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ServerAuthProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ServerAuthProvider>
    </Providers>
  );
}
