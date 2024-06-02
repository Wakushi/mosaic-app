import { config } from "@/app/provider"
import {
  DWORK_ABI,
  DWORK_ADDRESS_POLYGON,
  DWORK_SHARES_ABI,
  DWORK_SHARES_ADDRESS_POLYGON,
  ERC20_ABI,
  USDC_ADDRESS_POLYGON,
} from "@/lib/contract"
import {
  getTransactionReceipt,
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core"
import { chainConfig } from "./blockchain-config"
import {
  MasterworksWorkData,
  ShareDetail,
  WorkDetail,
  WorkShare,
} from "@/types/artwork"
import { getMasterworksData } from "./external-data"
import { Address, parseEther, parseUnits } from "viem"

const PRICE_VARIATION_ALLOWANCE = 0.00001

export async function getNativeTokenPriceUsd(): Promise<number> {
  const price: any = await readContract(config, {
    address: DWORK_SHARES_ADDRESS_POLYGON,
    abi: DWORK_SHARES_ABI,
    functionName: "getNativeTokenPriceUsd",
  })
  return Number(price)
}

export async function getUsdcValueOfUsd(usdAmount: number): Promise<number> {
  const price: any = await readContract(config, {
    address: DWORK_ADDRESS_POLYGON,
    abi: DWORK_ABI,
    functionName: "getUsdcValueOfUsd",
    args: [usdAmount],
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
      address: DWORK_SHARES_ADDRESS_POLYGON,
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
      address: DWORK_SHARES_ADDRESS_POLYGON,
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
      address: DWORK_SHARES_ADDRESS_POLYGON,
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
  tokenizationRequestId: string,
  destinationChainSelector: string
): Promise<string> {
  try {
    const args = [
      recipientAddress,
      newOwnerName,
      tokenizationRequestId,
      destinationChainSelector,
      1,
      3000000,
    ]
    const { request: transferRequest } = await simulateContract(config, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "xChainWorkTokenTransfer",
      args,
    })

    const result = await writeContract(config, transferRequest)

    return result
  } catch (error) {
    console.error("Error transferring work token across chains:", error)
    throw new Error("Failed to transfer work token across chains")
  }
}

export async function unlistMarketShareItem(marketShareItemId: number) {
  try {
    const { request: unlistRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "unlistMarketShareItem",
      args: [marketShareItemId],
    })

    const result = await writeContract(config, unlistRequest)

    return result
  } catch (error) {
    console.error("Error unlisting market share item:", error)
    throw new Error("Failed to unlist market share item")
  }
}

export async function redeemAndBurnSharesForUSDC(
  shareTokenId: number,
  shareAmount: number
) {
  try {
    const { request: burnSharesRequest } = await simulateContract(config, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "redeemAndBurnSharesForUSDC",
      args: [shareTokenId, shareAmount],
    })

    const result = await writeContract(config, burnSharesRequest)

    return result
  } catch (error) {
    console.error("Error burning shares for USDC:", error)
    throw new Error("Failed to burn shares for USDC")
  }
}

export async function getAllSharesDetails() {
  try {
    const result: any = await readContract(chainConfig, {
      abi: DWORK_SHARES_ABI,
      address: DWORK_SHARES_ADDRESS_POLYGON,
      functionName: "getLastTokenId",
    })

    const shareLastTokenId = Number(result)

    const workShares: WorkShare[] = []
    for (let i = 1; i <= shareLastTokenId; i++) {
      const share: any = await readContract(chainConfig, {
        address: DWORK_SHARES_ADDRESS_POLYGON,
        abi: DWORK_SHARES_ABI,
        functionName: "getWorkSharesByTokenId",
        args: [i],
      })

      if (!share.workTokenId) continue
      workShares.push({
        sharesTokenId: i,
        maxShareSupply: Number(share.maxShareSupply),
        sharePriceUsd: Number(share.sharePriceUsd),
        workTokenId: Number(share.workTokenId),
        totalShareBought: Number(share.totalShareBought),
        totalSellValueUsd: Number(share.totalSellValueUsd),
        workOwner: share.workOwner,
        isPaused: share.isPaused,
        isRedeemable: share.isRedeemable,
      })
    }
    const sharesDetailed: ShareDetail[] = []
    for (let workShare of workShares) {
      const tokenizationRequestId: any = await readContract(chainConfig, {
        address: DWORK_ADDRESS_POLYGON,
        abi: DWORK_ABI,
        functionName: "getTokenizationRequestIdByWorkTokenId",
        args: [workShare.workTokenId],
      })
      const tokenizationRequest: any = await readContract(chainConfig, {
        address: DWORK_ADDRESS_POLYGON,
        abi: DWORK_ABI,
        functionName: "getTokenizationRequest",
        args: [tokenizationRequestId],
      })
      if (tokenizationRequest.isMinted === false) continue
      const masterworksData: MasterworksWorkData = await getMasterworksData(
        tokenizationRequest.certificate.artist,
        tokenizationRequest.certificate.work
      )
      sharesDetailed.push({
        tokenizationRequest: {
          customerSubmissionIPFSHash:
            tokenizationRequest.customerSubmissionIPFSHash,
          appraiserReportIPFSHash: tokenizationRequest.appraiserReportIPFSHash,
          certificateIPFSHash: tokenizationRequest.certificateIPFSHash,
          owner: tokenizationRequest.owner,
          ownerName: tokenizationRequest.ownerName,
          lastWorkPriceUsd: Number(tokenizationRequest.lastWorkPriceUsd),
          workTokenId: Number(tokenizationRequest.workTokenId),
          sharesTokenId: tokenizationRequest.sharesTokenId.toString(),
          listingPriceUsd: Number(tokenizationRequest.listingPriceUsd),
          isMinted: tokenizationRequest.isMinted,
          isFractionalized: tokenizationRequest.isFractionalized,
          isPaused: tokenizationRequest.isPaused,
          isListed: tokenizationRequest.isListed,
          lastVerifiedAt: Number(tokenizationRequest.lastVerifiedAt),
          verificationStep: Number(tokenizationRequest.verificationStep),
          certificate: {
            artist: tokenizationRequest.certificate.artist,
            work: tokenizationRequest.certificate.work,
          },
        },
        workShare,
        masterworksData,
      })
    }
    return sharesDetailed
  } catch (error) {
    console.error("Error getting tokenization request:", error)
    throw new Error("Failed to get tokenization request")
  }
}

export async function getListedShares() {
  try {
    const result = await readContract(chainConfig, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "getListedItems",
    })
    return convertBigIntToString(result)
  } catch (error) {
    console.error("Error getting listed items:", error)
    throw new Error("Failed to get listed items")
  }
}

export function convertBigIntToString(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString()
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString)
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertBigIntToString(value),
      ])
    )
  } else {
    return obj
  }
}
// Work

export async function listWorkToken(workTokenId: number, listPriceUsd: string) {
  try {
    const listPriceUsdFormatted = parseUnits(listPriceUsd, 6)
    const { request: listWorkTokenRequest } = await simulateContract(config, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "listWorkToken",
      args: [workTokenId, listPriceUsdFormatted],
    })

    const result = await writeContract(config, listWorkTokenRequest)

    return result
  } catch (error) {
    console.error("Error listing work token:", error)
    throw new Error("Failed to list work token")
  }
}

export async function unlistWorkToken(workTokenId: number) {
  try {
    const { request: unlistWorkTokenRequest } = await simulateContract(config, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "unlistWorkToken",
      args: [workTokenId],
    })

    const result = await writeContract(config, unlistWorkTokenRequest)

    return result
  } catch (error) {
    console.error("Error unlisting work token:", error)
    throw new Error("Failed to unlist work token")
  }
}

export async function buyWorkToken(value: number, workTokenId: number) {
  try {
    const { request: approve } = await simulateContract(config, {
      address: USDC_ADDRESS_POLYGON,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [DWORK_ADDRESS_POLYGON, value],
    })

    const approvalResultHash = await writeContract(config, approve)

    await waitForTransactionReceipt(config, {
      hash: approvalResultHash,
    })

    const { request: buyWorkTokenRequest } = await simulateContract(config, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "buyWorkToken",
      args: [workTokenId],
    })

    const result = await writeContract(config, buyWorkTokenRequest)

    return result
  } catch (error) {
    console.error("Error buying work token:", error)
    throw new Error("Failed to buy work token")
  }
}

export async function getListedArtworks(): Promise<WorkDetail[]> {
  try {
    const lastTokenIdResult: any = await readContract(chainConfig, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "getLastTokenId",
    })
    const lastTokenId = Number(lastTokenIdResult)
    const listedArtworks: WorkDetail[] = []

    for (let i = 1; i <= lastTokenId; i++) {
      try {
        const tokenizationRequestId =
          await getTokenizationRequestIdByWorkTokenId(i)
        const tokenizationRequest = await getTokenizationRequestById(
          tokenizationRequestId.toString()
        )
        if (tokenizationRequest.workTokenId === "0") {
          continue
        }
        const masterworksData = await getMasterworksData(
          tokenizationRequest.certificate.artist,
          tokenizationRequest.certificate.work
        )
        const workDetail: WorkDetail = {
          tokenizationRequest,
          masterworksData,
        }

        if (tokenizationRequest.isListed) {
          listedArtworks.push(workDetail)
        }
      } catch (error) {
        console.error(`Error processing work token ID ${i}:`, error)
        continue
      }
    }

    return listedArtworks
  } catch (error) {
    console.error("Error fetching listed artworks:", error)
    throw new Error("Failed to fetch listed artworks")
  }
}

export async function getTokenizationRequestIdByWorkTokenId(
  workTokenId: number
): Promise<number> {
  try {
    const result: any = await readContract(chainConfig, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "getTokenizationRequestIdByWorkTokenId",
      args: [workTokenId],
    })
    return Number(result)
  } catch (error) {
    console.error("Error getting tokenization request ID:", error)
    throw new Error("Failed to get tokenization request ID")
  }
}

export async function getTokenizationRequestById(
  tokenizationRequestId: string
) {
  try {
    const result = await readContract(chainConfig, {
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: "getTokenizationRequest",
      args: [tokenizationRequestId],
    })

    return convertBigIntToString(result)
  } catch (error) {
    console.error("Error getting tokenization request:", error)
    throw new Error("Failed to get tokenization request")
  }
}

export async function getOwnedShares(owner: Address): Promise<any> {
  const result: any = await readContract(chainConfig, {
    address: DWORK_SHARES_ADDRESS_POLYGON,
    abi: DWORK_SHARES_ABI,
    functionName: "getLastTokenId",
  })

  const shareLastTokenId = Number(result)

  const ownedShares: any[] = []

  for (let i = 1; i <= shareLastTokenId; i++) {
    const balance: any = await readContract(config, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "balanceOf",
      args: [owner, i],
    })

    if (balance > 0) {
      ownedShares.push({
        sharesTokenId: i,
        balance: Number(balance),
      })
    }
  }

  return ownedShares
}
