"use client"
import { createContext, ReactNode } from "react"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ListedShareDetail, ShareDetail } from "@/types/artwork"
import {
  getAllSharesDetails,
  getListedShares,
} from "@/utils/user-contract-interactions"

interface SharesContextProviderProps {
  children: ReactNode
}

interface SharesContextProps {
  initialShares: ShareDetail[]
  initialSharesLoading: boolean
  listedShares: ListedShareDetail[]
  listedSharesLoading: boolean
}

const SharesContext = createContext<SharesContextProps>({
  initialShares: [],
  initialSharesLoading: true,
  listedShares: [],
  listedSharesLoading: true,
})

export default function SharesContextProvider(
  props: SharesContextProviderProps
) {
  const {
    data: initialShares,
    isLoading: initialSharesLoading,
  }: UseQueryResult<ShareDetail[], Error> = useQuery<ShareDetail[], Error>({
    queryKey: ["initialShares", "shares"],
    queryFn: fetchInitialShares,
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

  const context = {
    initialShares: initialShares ?? [],
    initialSharesLoading,
    listedShares: listedShares ?? [],
    listedSharesLoading,
  }

  return (
    <SharesContext.Provider value={context}>
      {props.children}
    </SharesContext.Provider>
  )
}

export { SharesContext }
