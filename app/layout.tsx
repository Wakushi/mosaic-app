"use client"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import Providers from "./provider"
import Header from "@/components/clientUi/Header"
import Footer from "@/components/clientUi/Footer"
import ContractEventListener from "@/components/ContractEventListener"
import PageRefresher from "@/components/PageRefresher"
import ClientProvider from "@/components/ClientProvider"

const playfairDisplay = Playfair_Display({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>
        <Providers>
          <ContractEventListener />
          <PageRefresher />
          <Header />
          <main className="flex-grow">
            <ClientProvider>{children}</ClientProvider>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
