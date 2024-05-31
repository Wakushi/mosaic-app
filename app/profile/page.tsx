"use client"

import { useContext, useState } from "react"
import Loader from "@/components/clientUi/Loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ListShareDialog from "@/components/listShareButton"
import { unlistMarketShareItem } from "@/utils/user-contract-interactions"
import BurnShareButton from "@/components/BurnShareButton"
import { SharesContext } from "@/services/ShareContext"
import { useQueryClient } from "@tanstack/react-query"
import { ListedShareDetail, OwnedShare } from "@/types/artwork"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState<"owned" | "listed">(
    "owned"
  )
  const queryClient = useQueryClient()

  const {
    ownedShares,
    ownedListedShares,
    ownedSharesLoading,
    ownedListedSharesLoading,
    initialSharesLoading,
    listedSharesLoading,
  } = useContext(SharesContext)

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleUnlist = async (marketShareItemId: number) => {
    if (ownedListedSharesLoading || !ownedListedShares?.length) return
    try {
      await unlistMarketShareItem(marketShareItemId)
      queryClient.invalidateQueries({
        queryKey: ["ownedListedShares", "shares"],
      })
    } catch (error) {
      console.error("Error unlisting market share item:", error)
    }
  }

  const filteredSharesData = ownedShares.filter((share) =>
    share.tokenizationRequest?.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const filteredListedShares = ownedListedShares?.filter((share) =>
    share.tokenizationRequest?.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  if (
    ownedSharesLoading ||
    ownedListedSharesLoading ||
    initialSharesLoading ||
    listedSharesLoading
  ) {
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
              {filteredListedShares && filteredListedShares.length ? (
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

const OwnedSharesList = ({ shares }: { shares: OwnedShare[] }) => {
  const [openDialogTokenId, setOpenDialogTokenId] = useState<number | null>(
    null
  )
  return (
    <>
      {shares.map((share, index) => (
        <div
          key={`${share.workShare.sharesTokenId}-${index}-owned`}
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
              <BurnShareButton sharesTokenId={share.workShare.sharesTokenId} />
            ) : (
              <Button
                className="w-[150px]"
                onClick={() =>
                  setOpenDialogTokenId(share.workShare.sharesTokenId)
                }
              >
                List share
              </Button>
            )}
          </div>
          {openDialogTokenId === share.workShare.sharesTokenId && (
            <ListShareDialog
              sharesTokenId={share.workShare.sharesTokenId}
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
  shares: ListedShareDetail[]
  handleUnlist: (id: number) => void
}) => {
  return (
    <>
      {shares.map((share, index) => (
        <div
          key={`${share.workShare.workTokenId}-${index}-listed`}
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
            <p>Amount: {share.listedShare.amount}</p>
            {share.workShare?.isRedeemable && (
              <div className="text-red-500 text-center">
                This share has been sold. Please unlist and burn your share.
              </div>
            )}
            <Button
              className="w-full"
              onClick={() => handleUnlist(+share.listedShare.itemId)}
            >
              Unlist
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
