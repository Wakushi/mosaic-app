"use client"
export const dynamic = "force-dynamic"
import Image from "next/image"
import Loader from "@/components/clientUi/Loader"
import { SharesContext } from "@/services/ShareContext"
import { useContext } from "react"
import BuyWorkButton from "@/components/marketplace/BuyWorkButton"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

const ListedShareDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const { listedArtworks, listedArtworksLoading } = useContext(SharesContext)

  const listedShareDetail = listedArtworks.find(
    (work) => +work.tokenizationRequest.workTokenId === parseInt(id)
  )

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString()
  const formatPrice = (price: number) => `$${Number(price).toLocaleString()}`

  if (listedArtworksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!listedShareDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl">
        Share sold !
      </div>
    )
  }

  return (
    <div className="min-h-screen flex pt-28 px-14 gap-5">
      <div>
        <div className="p-10 w-[55vw] h-[80vh] bg-white shadow-lg border-4 border-double mb-4">
          <Image
            src={listedShareDetail.masterworksData.imageURL || IMAGE_FALLBACK}
            alt={listedShareDetail.tokenizationRequest.certificate.artist}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
        <p className="text-center">
          {listedShareDetail.masterworksData.dimensions}
        </p>
      </div>
      <div className="flex flex-col gap-4 h-[80vh] p-5">
        <h1 className="text-5xl self-start">
          {listedShareDetail.tokenizationRequest.certificate.work}
        </h1>
        <p className="text-4xl text-slate-400">
          {listedShareDetail.tokenizationRequest.certificate.artist}
        </p>
        <p className="text-lg">{listedShareDetail.masterworksData.medium}</p>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">First Work Sale</h3>
          <p className="text-md text-gray-700">
            Date: {formatDate(listedShareDetail.masterworksData.firstSaleDate)}
          </p>
          <p className="text-md text-gray-700">
            Price:{" "}
            {formatPrice(listedShareDetail.masterworksData.firstSalePrice)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Last Work Sale</h3>
          <p className="text-md text-gray-700">
            Date: {formatDate(listedShareDetail.masterworksData.lastSaleDate)}
          </p>
          <p className="text-md text-gray-700">
            Price:{" "}
            {formatPrice(listedShareDetail.masterworksData.lastSalePrice)}
          </p>
        </div>
		<div className="mt-auto">
			<BuyWorkButton workTokenId={listedShareDetail.tokenizationRequest.workTokenId} />	
		</div>
		
      </div>
    </div>
  )
}

export default ListedShareDetailPage