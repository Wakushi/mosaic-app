import { createContext, ReactNode, useEffect } from "react"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ListedShareDetail, ShareDetail } from "@/types/artwork"
import { useAccount } from "wagmi"
import { DWORK_ADDRESS_OPTIMISM, DWORK_ADDRESS_POLYGON } from "@/lib/contract"

interface SharesContextProviderProps {
  children: ReactNode
}

interface SharesContextProps {
  initialShares: ShareDetail[]
  initialSharesLoading: boolean
  listedShares: ListedShareDetail[]
  listedSharesLoading: boolean
  activeWorkContractAddress?: string
}

const SharesContext = createContext<SharesContextProps>({
  initialShares: [],
  initialSharesLoading: true,
  listedShares: [],
  listedSharesLoading: true,
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
    const response = await fetch("/api/shares")
    if (!response.ok) {
      throw new Error("Failed to fetch shares data")
    }
    const sharesData = await response.json()
    return sharesData
  }

  async function fetchListedShares(): Promise<ListedShareDetail[]> {
    if (!initialShares) return []
    const response = await fetch("/api/listed-shares")
    if (!response.ok) {
      throw new Error("Failed to fetch shares data")
    }
    const listedSharesData = await response.json()
    const listedSharesDetailed = listedSharesData.map((listedShare: any) => {
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
    activeWorkContractAddress,
  }

  return (
    <SharesContext.Provider value={context}>
      {props.children}
    </SharesContext.Provider>
  )
}

export { SharesContext }
