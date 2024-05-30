"use client"
// Styles
import "@rainbow-me/rainbowkit/styles.css"

// React
import React, { ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { polygonAmoy, optimismSepolia } from "wagmi/chains"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider, http } from "wagmi"
import SharesContextProvider from "@/services/ShareContext"

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined")
}

export const config = getDefaultConfig({
  appName: "Mosaic",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [polygonAmoy, optimismSepolia],
  transports: {
    [polygonAmoy.id]: http("https://rpc-amoy.polygon.technology/"),
  },
  ssr: true,
})

interface ProvidersProps {
  children: ReactNode
}

const client = new QueryClient()

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <SharesContextProvider>{children}</SharesContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
