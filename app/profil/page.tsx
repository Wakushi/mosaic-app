"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Loader from "@/components/clientUi/Loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DWORK_SHARES_ADDRESS_POLYGON } from "@/lib/contract"
import Image from "next/image"
import ListShareDialog from "@/components/listShareButton"
import { unlistMarketShareItem } from "@/utils/user-contract-interactions"
import BurnShareButton from "@/components/BurnShareButton"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

const fetchShareData = async (tokenId: string) => {
  const response = await fetch(`/api/shares?id=${tokenId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch share data")
  }
  return response.json()
}

export default function Profil() {
  const { address: clientAddress } = useAccount()
  const [nfts, setNfts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sharesData, setSharesData] = useState<any[]>([])
  const [listedSharesDetails, setListedSharesDetails] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState<"owned" | "listed">(
    "owned"
  )
  const [openDialogTokenId, setOpenDialogTokenId] = useState<number | null>(
    null
  )

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
    if (nfts.length > 0) {
      const fetchAllSharesData = async () => {
        const sharesPromises = nfts.map((nft) =>
          fetchShareData(nft.tokenId)
            .then((data) => ({
              ...data,
              tokenId: nft.tokenId,
              balance: nft.balance,
            }))
            .catch((err) => {
              console.error(err)
              return null
            })
        )

        const sharesResults = await Promise.all(sharesPromises)
        setSharesData(sharesResults.filter((data) => data !== null))
      }

      fetchAllSharesData()
    }
  }, [nfts])

  useEffect(() => {
    const fetchListedShares = async () => {
      try {
        const response = await fetch("/api/listed-shares")
        if (!response.ok) {
          throw new Error("Failed to fetch listed shares")
        }
        const listedShares = await response.json()

        const userListedShares = listedShares.filter(
          (item: any) =>
            item.seller.toLowerCase() === clientAddress?.toLowerCase()
        )

        const sharesDetailsPromises = userListedShares.map((item: any) =>
          fetchShareData(item.sharesTokenId)
            .then((data) => ({
              ...data,
              itemId: item.itemId,
              amount: item.amount,
              priceUsd: item.priceUsd,
            }))
            .catch((err) => {
              console.error(err)
              return null
            })
        )

        const sharesDetailsResults = await Promise.all(sharesDetailsPromises)
        setListedSharesDetails(
          sharesDetailsResults.filter((data) => data !== null)
        )
        setLoading(false)
      } catch (error) {
        console.error("API error:", error)
        setLoading(false)
      }
    }

    if (clientAddress) {
      fetchListedShares()
    }
  }, [clientAddress])

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleUnlist = async (marketShareItemId: number) => {
    try {
      await unlistMarketShareItem(marketShareItemId)
      const updatedListedShares = listedSharesDetails.filter(
        (share) => share.itemId !== marketShareItemId
      )
      setListedSharesDetails(updatedListedShares)
    } catch (error) {
      console.error("Error unlisting market share item:", error)
    }
  }

  const filteredSharesData = sharesData.filter((share) =>
    share.tokenizationRequest.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20">
      <div className="self-start w-full py-10 px-24">
        <h1 className="text-4xl self-start mb-10">Profil</h1>
        <div className="w-full flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by artist"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-1/4"
          />
          <Button onClick={() => setActiveSection("owned")}>
            Owned Shares
          </Button>
          <Button onClick={() => setActiveSection("listed")}>
            Listed Shares
          </Button>
        </div>
        {activeSection === "owned" && (
          <>
            <h2 className="text-3xl mt-10 mb-4">Owned Shares</h2>
            <div className="grid grid-cols-3 gap-10 mt-4 justify-around">
              {filteredSharesData.map((share) => (
                <div
                  key={share.tokenId}
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
                    <h2>{share.tokenizationRequest.certificate.work}</h2>
                    <p>{share.tokenizationRequest.certificate.artist}</p>
                    <p>x{share.balance}</p>
                    {share.workShare.isRedeemable ? (
                      <BurnShareButton sharesTokenId={share.tokenId} />
                    ) : (
                      <Button
                        className="w-full"
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
            </div>
          </>
        )}
        {activeSection === "listed" && (
          <>
            <h2 className="text-3xl mt-10 mb-4">Listed Shares</h2>
            <div className="grid grid-cols-3 gap-10 mt-4 justify-around">
              {listedSharesDetails.map((share) => (
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
            </div>
          </>
        )}
      </div>
    </div>
  )
}
