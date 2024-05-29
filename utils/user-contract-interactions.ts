import { config } from "@/app/provider"
import { DWORK_SHARES_ABI, DWORK_SHARES_ADDRESS } from "@/lib/contract"
import { readContract, simulateContract, writeContract } from "@wagmi/core"
import { parseEther } from "viem"

const PRICE_VARIATION_ALLOWANCE = 0.00001

export async function getNativeTokenPriceUsd(): Promise<number> {
  const price: any = await readContract(config, {
    address: DWORK_SHARES_ADDRESS,
    abi: DWORK_SHARES_ABI,
    functionName: "getNativeTokenPriceUsd",
  })
  return Number(price)
}

export async function buyInitialShare(
  sharesTokenId: number,
  shareAmount: number,
  shareValueUsd: bigint
) {
  const nativeTokenPriceUsd = await getNativeTokenPriceUsd()
  const sharePriceNative =
    Number(shareValueUsd) / nativeTokenPriceUsd + PRICE_VARIATION_ALLOWANCE
  try {
    const { request: buyShareRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "buyInitialShare",
      args: [sharesTokenId, shareAmount],
      value: parseEther(sharePriceNative.toString()),
    })

    const result = await writeContract(config, buyShareRequest)

    return result
  } catch (error) {
    console.error("Error buying initial share:", error)
    throw new Error("Failed to buy initial share")
  }
}

export async function listMarketShareItem(
  sharesTokenId: number,
  amount: number,
  totalPriceUsd: number
) {
  try {
    const { request: listShareRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "listMarketShareItem",
      args: [sharesTokenId, amount, parseEther(totalPriceUsd.toString())],
    })

    const result = await writeContract(config, listShareRequest)

    return result
  } catch (error) {
    console.error("Error listing market share item:", error)
    throw new Error("Failed to list market share item")
  }
}

export async function buyMarketShareItem(
  marketShareItemId: number,
  priceUsd: number
) {
  try {
    const nativeTokenPriceUsd = await getNativeTokenPriceUsd()
    const sharePriceNative =
      Number(priceUsd) / nativeTokenPriceUsd + PRICE_VARIATION_ALLOWANCE
    const { request: buyMarketShareRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "buyMarketShareItem",
      args: [marketShareItemId],
      value: parseEther(sharePriceNative.toString()),
    })

    const result = await writeContract(config, buyMarketShareRequest)

    return result
  } catch (error) {
    console.error("Error buying market share item:", error)
    throw new Error("Failed to buy market share item")
  }
}

export async function xChainWorkTokenTransfer(
  recipientAddress: string,
  newOwnerName: string,
  tokenizationRequestId: number,
  targetChain: string
) {
  const chainId =
    targetChain === "Optimism" ? "5224473277236331295" : "16281711391670634445"

  try {
    const { request: transferRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "xChainWorkTokenTransfer",
      args: [
        recipientAddress,
        newOwnerName,
        tokenizationRequestId,
        chainId,
        1,
        300000,
      ],
    })

    const result = await writeContract(config, transferRequest)

    return result
  } catch (error) {
    console.error("Error transferring work token across chains:", error)
    throw new Error("Failed to transfer work token across chains")
  }
}
