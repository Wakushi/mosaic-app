import { config } from "@/app/provider"
import { DWORK_SHARES_ABI, DWORK_SHARES_ADDRESS } from "@/lib/contract"
import { simulateContract, writeContract } from "@wagmi/core"

export async function buyInitialShare(
  sharesTokenId: number,
  shareAmount: number,
  value: bigint
) {
  try {
    const { request: buyShareRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "buyInitialShare",
      args: [sharesTokenId, shareAmount],
      value,
    })

    const result = await writeContract(config, buyShareRequest)

    return result
  } catch (error) {
    console.error("Error buying initial share:", error)
    throw new Error("Failed to buy initial share")
  }
}
