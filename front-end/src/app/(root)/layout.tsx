import LeftSidebar from "@/components/root/LeftSidebar";
import MobileNav from "@/components/root/MobileNav";

import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import RightSidebarProvider from "@/components/root/RightSidebarProvider";
import QuotePlayer from "@/components/root/QuotePlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-W-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                src={"/icons/logo.svg"}
                width={30}
                height={30}
                alt="menu icon"
              />
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
            <Toaster />
              {children}
            </div>
          </div>
        </section>
        <RightSidebarProvider />
      </main>
      <QuotePlayer/>
    </div>
  );
}
