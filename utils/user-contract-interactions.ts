import { config } from "@/app/provider"
import { DWORK_SHARES_ABI, DWORK_SHARES_ADDRESS } from "@/lib/contract"
import { readContract, simulateContract, writeContract } from "@wagmi/core"
import { parseEther } from "viem"

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
  const sharePriceNative = Number(shareValueUsd) / nativeTokenPriceUsd

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

export async function buyMarketShareItem(marketShareItemId: number) {
  try {
    const { request: buyMarketShareRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "buyMarketShareItem",
      args: [marketShareItemId],
    })

    const result = await writeContract(config, buyMarketShareRequest)

    return result
  } catch (error) {
    console.error("Error buying market share item:", error)
    throw new Error("Failed to buy market share item")
  }
}