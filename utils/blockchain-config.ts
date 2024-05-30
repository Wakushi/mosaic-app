import { http, createConfig } from "@wagmi/core"
import { optimismSepolia, polygonAmoy } from "@wagmi/core/chains"
export const chainConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(process.env.POLYGON_AMOY_ALCHEMY_READ_KEY),
    [optimismSepolia.id]: http(process.env.OPTIMISM_SEPOLIA_ALCHEMY_KEY),
  },
})
