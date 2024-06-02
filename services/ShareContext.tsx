"use client"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import {
  ListedShareDetail,
  OwnedShare,
  ShareDetail,
  WorkDetail,
} from "@/types/artwork"
import {
  getAllSharesDetails,
  getListedArtworks,
  getListedShares,
  getOwnedShares,
} from "@/utils/user-contract-interactions"
import { useAccount } from "wagmi"
import { createContext, ReactNode, useEffect } from "react"
import { DWORK_ADDRESS_OPTIMISM, DWORK_ADDRESS_POLYGON } from "@/lib/contract"

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
  listedArtworks: WorkDetail[]
  listedArtworksLoading: boolean
  activeWorkContractAddress?: string
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
  listedArtworks: [],
  listedArtworksLoading: true,
  activeWorkContractAddress: DWORK_ADDRESS_POLYGON,
})

export default function SharesContextProvider(
  props: SharesContextProviderProps
) {
  const account = useAccount()
  const activeWorkContractAddress = getWorkContractAddress(
    account?.chain?.id || 80002
  )

  function getWorkContractAddress(chainId: number) {
    switch (chainId) {
      case 80002:
        return DWORK_ADDRESS_POLYGON
      case 11155420:
        return DWORK_ADDRESS_OPTIMISM
      default:
        return DWORK_ADDRESS_POLYGON
    }
  }

  useEffect(() => {}, [account])

  const {
    data: initialShares,
    isLoading: initialSharesLoading,
  }: UseQueryResult<ShareDetail[], Error> = useQuery({
    queryKey: ["initialShares", "shares"],
    queryFn: fetchInitialShares,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: ownedShares,
    isLoading: ownedSharesLoading,
  }: UseQueryResult<OwnedShare[], Error> = useQuery({
    queryKey: ["ownedShares", "shares"],
    queryFn: getOwnerShares,
    enabled: !!account?.address && !!initialShares && !initialSharesLoading,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: listedShares,
    isLoading: listedSharesLoading,
  }: UseQueryResult<ListedShareDetail[], Error> = useQuery({
    queryKey: ["listedShares", "shares"],
    queryFn: fetchListedShares,
    enabled: !initialSharesLoading && !!initialShares,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: ownedListedShares,
    isLoading: ownedListedSharesLoading,
  }: UseQueryResult<ListedShareDetail[], Error> = useQuery({
    queryKey: ["ownedListedShares", "shares"],
    queryFn: getOwnerListedShares,
    enabled: !!account?.address && !!listedShares && !listedSharesLoading,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const {
    data: listedArtworks,
    isLoading: listedArtworksLoading,
  }: UseQueryResult<WorkDetail[], Error> = useQuery({
    queryKey: ["listedArtworks"],
    queryFn: fetchListedArtworks,
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

  async function fetchListedArtworks(): Promise<WorkDetail[]> {
    const listedArtworks = await getListedArtworks()
    if (!listedArtworks.length) {
      throw new Error("Failed to fetch listed artworks data")
    }
    return listedArtworks
  }

  async function getOwnerShares(): Promise<OwnedShare[]> {
    const clientAddress = account?.address
    if (!clientAddress || !initialShares?.length) return []

    const ownedTokens = await getOwnedShares(clientAddress)
    const detailedOwnerShares: OwnedShare[] = []
    ownedTokens.forEach((token: any) => {
      const ownedShare = initialShares.find(
        (share) => +share.workShare.sharesTokenId === +token.sharesTokenId
      )
      if (ownedShare) {
        detailedOwnerShares.push({
          ...ownedShare,
          balance: +token.balance,
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
    listedArtworks: listedArtworks ?? [],
    listedArtworksLoading,
    activeWorkContractAddress,
  }

  return (
    <SharesContext.Provider value={context}>
      {props.children}
    </SharesContext.Provider>
  )
}

export { SharesContext }
