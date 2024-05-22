import { http, createConfig } from "@wagmi/core"
import { polygonAmoy } from "@wagmi/core/chains"
export const chainConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
})
