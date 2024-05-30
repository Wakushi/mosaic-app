"use client"

import { useContext, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Loader from "@/components/clientUi/Loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DWORK_SHARES_ADDRESS_POLYGON } from "@/lib/contract"
import Image from "next/image"
import ListShareDialog from "@/components/listShareButton"
import { unlistMarketShareItem } from "@/utils/user-contract-interactions"
import BurnShareButton from "@/components/BurnShareButton"
import { SharesContext } from "@/services/ShareContext"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

export default function Profile() {
  const { address: clientAddress } = useAccount()
  const [nfts, setNfts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState<"owned" | "listed">(
    "owned"
  )

  const [ownedShares, setOwnedShares] = useState<any[]>([])
  const [ownedListedShares, setOwnedListedShares] = useState<any[]>([])

  const {
    initialShares,
    listedShares,
    initialSharesLoading,
    listedSharesLoading,
  } = useContext(SharesContext)

  useEffect(() => {
    if (clientAddress) {
      const options = { method: "GET", headers: { accept: "application/json" } }

      fetch(
        `https://polygon-amoy.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${clientAddress}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const filteredNfts = response.ownedNfts.filter(
            (nft: any) =>
              nft.contract.address.toLowerCase() ===
              DWORK_SHARES_ADDRESS_POLYGON.toLowerCase()
          )
          setNfts(filteredNfts)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [clientAddress])

  useEffect(() => {
    if (nfts.length > 0 && initialShares.length > 0) {
      const ownedShares: any[] = []
      nfts.forEach((nft) => {
        const ownedShare = initialShares.find(
          (share) => +share.workShare.workTokenId === +nft.tokenId
        )
        ownedShares.push({
          ...ownedShare,
          balance: nft.balance,
          tokenId: nft.tokenId,
        })
      })
      setOwnedShares(ownedShares)
    }
  }, [nfts, initialShares])

  useEffect(() => {
    const ownedListedShares = listedShares.filter(
      (share) =>
        share.listedShare.seller.toLowerCase() === clientAddress?.toLowerCase()
    )
    setOwnedListedShares(ownedListedShares)
  }, [clientAddress])

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleUnlist = async (marketShareItemId: number) => {
    try {
      await unlistMarketShareItem(marketShareItemId)
      const updatedListedShares = ownedListedShares.filter(
        (share) => share.itemId !== marketShareItemId
      )
      setOwnedListedShares(updatedListedShares)
    } catch (error) {
      console.error("Error unlisting market share item:", error)
    }
  }

  const filteredSharesData = ownedShares.filter((share) =>
    share.tokenizationRequest.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const filteredListedShares = ownedListedShares.filter((share) =>
    share.tokenizationRequest.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  if (loading || initialSharesLoading || listedSharesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20">
      <div className="self-start w-full py-10 px-24">
        <h1 className="text-4xl self-start mb-10">Profile</h1>
        <div className="w-full flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by artist"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-1/4"
          />
          <Button
            variant={activeSection === "listed" ? "outline" : "default"}
            onClick={() => setActiveSection("owned")}
          >
            Owned Shares
          </Button>
          <Button
            variant={activeSection === "owned" ? "outline" : "default"}
            onClick={() => setActiveSection("listed")}
          >
            Listed Shares
          </Button>
        </div>
        {activeSection === "owned" && (
          <>
            <h2 className="text-3xl mt-10 mb-4">Owned Shares</h2>
            <div className="grid grid-cols-3 gap-10 mt-4 justify-around">
              {filteredSharesData.length ? (
                <OwnedSharesList shares={filteredSharesData} />
              ) : (
                <div>You don't own any share.</div>
              )}
            </div>
          </>
        )}
        {activeSection === "listed" && (
          <>
            <h2 className="text-3xl mt-10 mb-4">Listed Shares</h2>
            <div className="grid grid-cols-3 gap-10 mt-4 justify-around">
              {filteredListedShares.length ? (
                <ListedSharesList
                  shares={filteredListedShares}
                  handleUnlist={handleUnlist}
                />
              ) : (
                <div>You don't have any listed shares.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const OwnedSharesList = ({ shares }: { shares: any[] }) => {
  const [openDialogTokenId, setOpenDialogTokenId] = useState<number | null>(
    null
  )
  return (
    <>
      {shares.map((share) => (
        <div
          key={share.tokenId}
          className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white max-h-[400px]"
        >
          <div className="flex-1 w-full h-[200px] shadow-lg">
            <Image
              src={share.masterworksData?.imageURL || IMAGE_FALLBACK}
              alt="work"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center flex-1">
            <h2>{share.tokenizationRequest.certificate.work}</h2>
            <p>{share.tokenizationRequest.certificate.artist}</p>
            <p className="mb-4 font-sans">x{share.balance}</p>
            {share.workShare.isRedeemable ? (
              <BurnShareButton sharesTokenId={share.tokenId} />
            ) : (
              <Button
                className="w-[150px]"
                onClick={() => setOpenDialogTokenId(share.tokenId)}
              >
                List share
              </Button>
            )}
          </div>
          {openDialogTokenId === share.tokenId && (
            <ListShareDialog
              sharesTokenId={share.tokenId}
              open={true}
              setOpen={() => setOpenDialogTokenId(null)}
            />
          )}
        </div>
      ))}
    </>
  )
}

const ListedSharesList = ({
  shares,
  handleUnlist,
}: {
  shares: any[]
  handleUnlist: (id: number) => void
}) => {
  return (
    <>
      {shares.map((share) => (
        <div
          key={share.itemId}
          className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white max-h-[400px]"
        >
          <div className="flex-1 w-full h-[200px]">
            <Image
              src={share.masterworksData?.imageURL || IMAGE_FALLBACK}
              alt="work"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center flex-1">
            <h2>{share.tokenizationRequest?.certificate?.work}</h2>
            <p>{share.tokenizationRequest?.certificate?.artist}</p>
            <p>Amount: {share.amount}</p>
            {share.workShare?.isRedeemable && (
              <div className="text-red-500 text-center">
                This share has been sold. Please unlist and burn your share.
              </div>
            )}
            <Button
              className="w-full"
              onClick={() => handleUnlist(share.itemId)}
            >
              Unlist
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
