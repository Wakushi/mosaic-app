import { createWalletClient, http, createPublicClient, Address } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { polygonAmoy } from "viem/chains"
import {
  DWORK_ADRESS,
  DWORK_ABI,
  DWORK_SHARES_ADDRESS,
  DWORK_SHARES_ABI,
} from "@/lib/contract"
import { updateArtworkStatus } from "@/utils/firebase-data"
import { convertBigIntToString } from "./helpers"
import { MasterworksWorkData, ShareDetail, WorkShare } from "@/types/artwork"
import { getMasterworksData } from "./external-data"

const account = privateKeyToAccount((process.env.PRIVATE_KEY as `0x`) || "")

const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(
    "https://polygon-amoy.g.alchemy.com/v2/hYZU9a72JALL4ikqBUrn4e4FXPWAMi_O"
  ),
})

const walletClient = createWalletClient({
  account,
  chain: polygonAmoy,
  transport: http(
    "https://polygon-amoy.g.alchemy.com/v2/hYZU9a72JALL4ikqBUrn4e4FXPWAMi_O"
  ),
})

export async function openTokenizationRequest(
  customerSubmissionIPFSHash: string,
  appraiserReportIPFSHash: string,
  certificateIPFSHash: string,
  clientAddress: string,
  artworkTitle: string
) {
  try {
    const { request: tokenizationRequest, result } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "openTokenizationRequest",
        args: [
          customerSubmissionIPFSHash,
          appraiserReportIPFSHash,
          certificateIPFSHash,
          clientAddress,
        ],
      })

    const response = await walletClient.writeContract(tokenizationRequest)

    await updateArtworkStatus(artworkTitle, "processing")

    return convertBigIntToString(result)
  } catch (error) {
    console.error("Error opening tokenization request:", error)
    throw new Error("Failed to open tokenization request")
  }
}

export async function requestWorkVerification(
  tokenizationRequestId: string,
  title: string
) {
  try {
    const { request: workVerificationRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "requestWorkVerification",
        args: [tokenizationRequestId],
      })

    const result = await walletClient.writeContract(workVerificationRequest)

    await updateArtworkStatus(title, "approved")

    return result
  } catch (error) {
    console.error("Error requesting work verification:", error)
    throw new Error("Failed to request work verification")
  }
}

// Share

export async function createShares(
  tokenizationRequestId: number,
  shareSupply: number,
  sharePriceUsd: number,
  artworkTitle: string
) {
  try {
    const { request: createSharesRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "createWorkShares",
        args: [tokenizationRequestId, shareSupply, sharePriceUsd],
      })

    const result = await walletClient.writeContract(createSharesRequest)

    await updateArtworkStatus(artworkTitle, "shares created")

    return result
  } catch (error) {
    console.error("Error creating shares:", error)
    throw new Error("Failed to create shares")
  }
}

export async function getTokenizationRequestById(
  tokenizationRequestId: BigInt
) {
  try {
    const result = await publicClient.readContract({
      address: DWORK_ADRESS,
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

export async function getAllSharesDetails() {
  try {
    const result: any = await publicClient.readContract({
      address: DWORK_SHARES_ADDRESS,
      abi: DWORK_SHARES_ABI,
      functionName: "getLastTokenId",
    })
    const shareLastTokenId = Number(result)
    const workShares: WorkShare[] = []
    for (let i = 1; i <= shareLastTokenId; i++) {
      const share: any = await publicClient.readContract({
        address: DWORK_SHARES_ADDRESS,
        abi: DWORK_SHARES_ABI,
        functionName: "getWorkSharesByTokenId",
        args: [i],
      })
      workShares.push({
        sharesTokenId: i,
        maxShareSupply: Number(share.maxShareSupply),
        sharePriceUsd: Number(share.sharePriceUsd),
        workTokenId: Number(share.workTokenId),
        totalShareBought: Number(share.totalShareBought),
        totalSellValueUsd: Number(share.totalSellValueUsd),
        workOwner: share.workOwner,
        isPaused: share.isPaused,
      })
    }
    const sharesDetailed: ShareDetail[] = []
    for (let workShare of workShares) {
      const tokenizationRequest: any = await publicClient.readContract({
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "getTokenizationRequestByWorkTokenId",
        args: [workShare.workTokenId],
      })
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
          initialOwnerName: tokenizationRequest.initialOwnerName,
          lastWorkPriceUsd: Number(tokenizationRequest.lastWorkPriceUsd),
          workTokenId: Number(tokenizationRequest.workTokenId),
          sharesTokenId: Number(tokenizationRequest.sharesTokenId),
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
