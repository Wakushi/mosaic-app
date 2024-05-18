'use client';

// Styles
import '@rainbow-me/rainbowkit/styles.css';

// React
import React, { ReactNode } from 'react';

// Raimbokit
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';

// Wagmi
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  sepolia,
  baseSepolia
} from 'wagmi/chains';
import { alchemyProvider } from "@wagmi/core/providers/alchemy"

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, baseSepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" })]
)

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
}

const { connectors } = getDefaultWallets({
  appName: 'Mosaic',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;