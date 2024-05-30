"use client"
import Image from "next/image"
import Loader from "@/components/clientUi/Loader"
import BuyShareDialog from "@/components/marketplace/BuyShareDialog"
import { formatUnits } from "viem"
import { SharesContext } from "@/services/ShareContext"
import { useContext } from "react"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

const InitialShareDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const { initialShares, initialSharesLoading } = useContext(SharesContext)

  const shareDetail = initialShares?.find(
    (share) => +share.workShare.sharesTokenId === +id
  )

  if (initialSharesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    )
  }

  if (!shareDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl">
        Share sold !
      </div>
    )
  }

  return (
    <div className="min-h-screen  flex pt-28 px-14 gap-5">
      <div>
        <div className="p-10 w-[55vw] bg-white shadow-lg">
          <Image
            src={shareDetail.masterworksData.imageURL || IMAGE_FALLBACK}
            alt={shareDetail.tokenizationRequest.certificate.artist}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
        <p className="text-center">{shareDetail.masterworksData.dimensions}</p>
      </div>
      <div className="flex flex-col gap-4 h-fit bg-white p-5 shadow-lg">
        <h1 className="text-5xl self-start">
          {shareDetail.tokenizationRequest.certificate.work}
        </h1>
        <p className="text-4xl text-slate-400">
          {shareDetail.tokenizationRequest.certificate.artist}
        </p>
        <p className="text-lg">{shareDetail.masterworksData.medium}</p>
        <p>
          Price: {formatUnits(BigInt(shareDetail.workShare.sharePriceUsd), 18)}{" "}
          USD
        </p>
        <div className="flex flex-col items-center gap-3">
          <p>
            {shareDetail.workShare.maxShareSupply -
              shareDetail.workShare.totalShareBought}
            /{shareDetail.workShare.maxShareSupply}
          </p>

          <BuyShareDialog
            sharesTokenId={shareDetail.workShare.sharesTokenId}
            sharePriceUsd={formatUnits(
              BigInt(shareDetail.workShare.sharePriceUsd),
              18
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default InitialShareDetailPage
