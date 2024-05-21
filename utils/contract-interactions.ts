import { createWalletClient, http, createPublicClient } from "viem"
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

const account = privateKeyToAccount((process.env.PRIVATE_KEY as `0x`) || "")

const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.ALCHEMY_URL),
})

const walletClient = createWalletClient({
  account,
  chain: polygonAmoy,
  transport: http(process.env.ALCHEMY_URL),
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
