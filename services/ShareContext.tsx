"use client"
import { createContext, ReactNode } from "react"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ListedShareDetail, OwnedShare, ShareDetail } from "@/types/artwork"
import {
  getAllSharesDetails,
  getListedShares,
} from "@/utils/user-contract-interactions"
import { useAccount } from "wagmi"

interface SharesContextProviderProps {
  children: ReactNode
}

interface SharesContextProps {
  initialShares: ShareDetail[]
  initialSharesLoading: boolean
  listedShares: ListedShareDetail[]
  listedSharesLoading: boolean
  ownedShares: OwnedShare[]
  ownedSharesLoading: boolean
  ownedListedShares?: ListedShareDetail[]
  ownedListedSharesLoading?: boolean
}

const SharesContext = createContext<SharesContextProps>({
  initialShares: [],
  initialSharesLoading: true,
  listedShares: [],
  listedSharesLoading: true,
  ownedShares: [],
  ownedSharesLoading: true,
  ownedListedShares: [],
  ownedListedSharesLoading: true,
})

export default function SharesContextProvider(
  props: SharesContextProviderProps
) {
  const account = useAccount()

  const {
    data: initialShares,
    isLoading: initialSharesLoading,
  }: UseQueryResult<ShareDetail[], Error> = useQuery<ShareDetail[], Error>({
    queryKey: ["initialShares", "shares"],
    queryFn: fetchInitialShares,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: ownedShares,
    isLoading: ownedSharesLoading,
  }: UseQueryResult<OwnedShare[], Error> = useQuery<OwnedShare[], Error>({
    queryKey: ["ownedShares", "shares"],
    queryFn: getOwnerShares,
    enabled: !!account?.address && !!initialShares && !initialSharesLoading,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: listedShares,
    isLoading: listedSharesLoading,
  }: UseQueryResult<ListedShareDetail[], Error> = useQuery<
    ListedShareDetail[],
    Error
  >({
    queryKey: ["listedShares", "shares"],
    queryFn: fetchListedShares,
    enabled: !initialSharesLoading && !!initialShares,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: ownedListedShares,
    isLoading: ownedListedSharesLoading,
  }: UseQueryResult<ListedShareDetail[], Error> = useQuery<
    ListedShareDetail[],
    Error
  >({
    queryKey: ["ownedListedShares", "shares"],
    queryFn: getOwnerListedShares,
    enabled: !!account.address && !!listedShares && !listedSharesLoading,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  async function fetchInitialShares(): Promise<ShareDetail[]> {
    const shares = await getAllSharesDetails()
    if (!shares.length) {
      throw new Error("Failed to fetch shares data")
    }
    return shares
  }

  async function fetchListedShares(): Promise<ListedShareDetail[]> {
    if (!initialShares) return []
    const listedShares = await getListedShares()
    if (!listedShares.length) {
      throw new Error("Failed to fetch shares data")
    }
    const listedSharesDetailed = listedShares.map((listedShare: any) => {
      const shareDetail = initialShares.find(
        (share) => +share.workShare.sharesTokenId === +listedShare.sharesTokenId
      )
      return {
        ...shareDetail,
        listedShare,
      } as ListedShareDetail
    })
    return listedSharesDetailed
  }

  async function getOwnerShares(): Promise<OwnedShare[]> {
    const clientAddress = account?.address
    if (!clientAddress || !initialShares?.length) return []
    const response = await fetch(`/api/nft?clientAddress=${clientAddress}`)
    const ownedTokens = await response.json()
    const detailedOwnerShares: OwnedShare[] = []
    ownedTokens.forEach((token: any) => {
      const ownedShare = initialShares.find(
        (share) => +share.workShare.sharesTokenId === +token.tokenId
      )
      if (ownedShare) {
        detailedOwnerShares.push({
          ...ownedShare,
          balance: token.balance,
        })
      }
    })
    return detailedOwnerShares
  }

  async function getOwnerListedShares(): Promise<ListedShareDetail[]> {
    const clientAddress = account?.address
    if (!clientAddress || !listedShares?.length) return []
    const ownedListedShares = listedShares.filter(
      (share) =>
        share.listedShare.seller.toLowerCase() === clientAddress.toLowerCase()
    )
    return ownedListedShares
  }

  const context = {
    initialShares: initialShares ?? [],
    initialSharesLoading,
    listedShares: listedShares ?? [],
    listedSharesLoading,
    ownedShares: ownedShares ?? [],
    ownedSharesLoading,
    ownedListedShares: ownedListedShares ?? [],
    ownedListedSharesLoading,
  }

  return (
    <SharesContext.Provider value={context}>
      {props.children}
    </SharesContext.Provider>
  )
}

export { SharesContext }
