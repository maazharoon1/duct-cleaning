import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RouteScrollReset } from "@/components/site/route-scroll-reset";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Duct Master | Air Duct, Dryer Vent & Chimney Cleaning",
  description: "Professional air duct, dryer vent, and chimney cleaning for a cleaner, more comfortable home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={inter.variable}><body>{children}<RouteScrollReset /><Toaster /></body></html>;
}
