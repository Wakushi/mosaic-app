import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import ContractEventListener from "@/components/ContractEventListener";
import PageRefresher from "@/components/PageRefresher"; 

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mosaic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>
        <Providers>
          <ContractEventListener />
          <PageRefresher /> 
          <Header />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
