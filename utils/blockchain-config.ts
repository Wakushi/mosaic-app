import { http, createConfig } from "@wagmi/core"
import { polygonAmoy } from "@wagmi/core/chains"
export const chainConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(
      "https://polygon-amoy.g.alchemy.com/v2/hYZU9a72JALL4ikqBUrn4e4FXPWAMi_O"
    ),
  },
})
