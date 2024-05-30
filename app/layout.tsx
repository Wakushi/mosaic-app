"use client"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import Providers from "./provider"
import Header from "@/components/clientUi/Header"
import Footer from "@/components/clientUi/Footer"
import ContractEventListener from "@/components/ContractEventListener"
import PageRefresher from "@/components/PageRefresher"
import ClientProvider from "@/components/ClientProvider"
import { useEffect } from "react"
import { useUserStore } from "@/store/useStore"

const playfairDisplay = Playfair_Display({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialShares = useUserStore((state) => state.initialShares)
  const setInitialShares = useUserStore((state) => state.setInitialShares)

  useEffect(() => {
    const fetchAndStoreSharesData = async () => {
      if (initialShares.length > 0) return
      try {
        const response = await fetch("/api/shares")
        if (!response.ok) {
          throw new Error("Failed to fetch shares data")
        }
        const sharesData = await response.json()
        setInitialShares(sharesData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAndStoreSharesData()
  }, [initialShares, setInitialShares])

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
