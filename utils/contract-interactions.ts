import { createWalletClient, http, createPublicClient, parseUnits } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { polygonAmoy } from "viem/chains"
import {
  DWORK_ADDRESS_POLYGON,
  DWORK_ABI,
  DWORK_SHARES_ADDRESS_POLYGON,
  DWORK_SHARES_ABI,
} from "@/lib/contract"
import { ShareDetail, WorkShare, WorkDetail } from "@/types/artwork"
import { getMasterworksData } from "./external-data"
import { chainConfig } from "./blockchain-config"
import { readContract } from "@wagmi/core"

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x`)

const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.POLYGON_AMOY_ALCHEMY_WRITE_KEY),
})

const walletClient = createWalletClient({
  account,
  chain: polygonAmoy,
  transport: http(process.env.POLYGON_AMOY_ALCHEMY_WRITE_KEY),
})

// Dwork contract

export async function openTokenizationRequest(
  customerSubmissionIPFSHash: string,
  appraiserReportIPFSHash: string,
  certificateIPFSHash: string,
  clientAddress: string
) {
  try {
    const args = [
      customerSubmissionIPFSHash,
      appraiserReportIPFSHash,
      certificateIPFSHash,
      clientAddress,
    ]
    const { request: tokenizationRequest, result } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADDRESS_POLYGON,
        abi: DWORK_ABI,
        functionName: "openTokenizationRequest",
        args,
      })

    const response = await walletClient.writeContract(tokenizationRequest)

    return convertBigIntToString(result)
  } catch (error) {
    console.error("Error opening tokenization request:", error)
    throw new Error("Failed to open tokenization request")
  }
}

export async function requestWorkVerification(tokenizationRequestId: string) {
  try {
    const { request: workVerificationRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADDRESS_POLYGON,
        abi: DWORK_ABI,
        functionName: "requestWorkVerification",
        args: [tokenizationRequestId],
      })

    const result = await walletClient.writeContract(workVerificationRequest)

    return result
  } catch (error) {
    console.error("Error requesting work verification:", error)
    throw new Error("Failed to request work verification")
  }
}

export async function createShares(
  tokenizationRequestId: number,
  shareSupply: number,
  sharePriceUsd: number
) {
  try {
    const { request: createSharesRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADDRESS_POLYGON,
        abi: DWORK_ABI,
        functionName: "createWorkShares",
        args: [
          tokenizationRequestId,
          shareSupply,
          parseUnits(sharePriceUsd.toString(), 18),
        ],
      })

    const result = await walletClient.writeContract(createSharesRequest)
    return result
  } catch (error) {
    console.error("Error creating shares:", error)
    throw new Error("Failed to create shares")
  }
}

export async function getShareDetail(id: number): Promise<ShareDetail> {
  try {
    const share: any = await readContract(chainConfig, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "getWorkSharesByTokenId",
      args: [id],
    })

    const workShare: WorkShare = {
      sharesTokenId: id,
      maxShareSupply: Number(share.maxShareSupply),
      sharePriceUsd: Number(share.sharePriceUsd),
      workTokenId: Number(share.workTokenId),
      totalShareBought: Number(share.totalShareBought),
      totalSellValueUsd: Number(share.totalSellValueUsd),
      workOwner: share.workOwner,
      isPaused: share.isPaused,
      isRedeemable: share.isRedeemable,
    }

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

    const masterworksData = await getMasterworksData(
      tokenizationRequest.certificate.artist,
      tokenizationRequest.certificate.work
    )

    const shareDetail: ShareDetail = {
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
    }

    return shareDetail
  } catch (error) {
    console.error("Error getting share detail:", error)
    throw new Error("Failed to get share detail")
  }
}

export async function getListedItemById(id: number) {
  try {
    const result = await readContract(chainConfig, {
      address: DWORK_SHARES_ADDRESS_POLYGON,
      abi: DWORK_SHARES_ABI,
      functionName: "getMarketShareItemById",
      args: [id],
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

export async function performUpkeep(tokenizationRequestId: number) {
  try {
    const formattedArgument = `0x000000000000000000000000000000000000000000000000000000000000000${tokenizationRequestId}`;

    const { request: performUpkeepRequest } = await publicClient.simulateContract({
      account: walletClient.account,
      address: DWORK_ADDRESS_POLYGON,
      abi: DWORK_ABI,
      functionName: 'performUpkeep',
      args: [formattedArgument],
    });

    const result = await walletClient.writeContract(performUpkeepRequest);

    return result;
  } catch (error) {
    console.error('Error performing upkeep:', error);
    throw new Error('Failed to perform upkeep');
  }
}
