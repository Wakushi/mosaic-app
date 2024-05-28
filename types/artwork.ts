import { Address } from "viem"

export type Artwork = {
  id: string
  clientAddress: string
  status: WorkStatus
  createdAt: number
  approvedAt?: number
  title: string
  artist: string
  owner: string
  price: number
  tokenizationRequestId?: string
  tokenizationRequest?: TokenizationRequest
}

export type ArtworkData = {
  clientAddress: string | undefined
  title: string
  artist: string
  owner: string
  price: number
}

export type WorkShare = {
  maxShareSupply: number
  sharePriceUsd: bigint
  workTokenId: number
  sharesTokenId: number
  totalShareBought: number
  totalSellValueUsd: number
  workOwner: Address
  isPaused: boolean
}

export type TokenizationRequest = {
  customerSubmissionIPFSHash: string
  appraiserReportIPFSHash: string
  certificateIPFSHash: string
  owner: Address
  initialOwnerName: string
  lastWorkPriceUsd: number
  workTokenId: number
  sharesTokenId: number
  listingPriceUsd: number
  isMinted: boolean
  isFractionalized: boolean
  isPaused: boolean
  isListed: boolean
  lastVerifiedAt: number
  verificationStep: number
  certificate: {
    artist: string
    work: string
  }
}

export type ShareDetail = {
  tokenizationRequest: TokenizationRequest
  workShare: WorkShare
  masterworksData: MasterworksWorkData
}

export type MasterworksWorkData = {
  title: string
  artist: string
  medium: string
  dimensions: string
  firstSaleDate: string
  lastSaleDate: string
  firstSalePrice: number
  lastSalePrice: number
  moic: number
  imageURL: string
}

export type WorkStatus =
  | "submitted" // Submitted is the status when the client submits the work (when data is only on firebase, not on the blockchain)
  | "pending certificate extraction"
  | "certificate extracted"
  | "pending verification"
  | "work verified"
  | "tokenized"
