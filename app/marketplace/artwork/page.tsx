"use client"

import { useEffect, useState } from "react";
import { ShareDetail } from "@/types/artwork";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import BuyShareDialog from "@/components/marketplace/BuyShareDialog";

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

const Artwork = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [shareDetail, setShareDetail] = useState<ShareDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchShareDetail = async () => {
        try {
          const response = await fetch(`/api/shares?id=${id}`)
          if (!response.ok) {
            throw new Error("Failed to fetch share details")
          }
          const data: ShareDetail = await response.json()
          setShareDetail(data)
          setLoading(false)
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError("An unknown error occurred")
          }
          setLoading(false)
        }
      }

      fetchShareDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-300">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!shareDetail) {
    return <div>No details available</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-300 flex pt-20 px-14 gap-5">
      <div>
        <div className=" p-10 w-[55vw] bg-white shadow-lg">
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
      <div className="flex flex-col gap-4 h-[50vh] bg-white p-5 shadow-lg">
        <h1 className="text-6xl self-start">
          {shareDetail.tokenizationRequest.certificate.work}
        </h1>
        <p className="text-4xl text-slate-400">
          {shareDetail.tokenizationRequest.certificate.artist}
        </p>
        <p className="text-lg">{shareDetail.masterworksData.medium}</p>

        <p>
          Owner: {shareDetail.tokenizationRequest.owner}
        </p>
        <p>Price: {shareDetail.workShare.sharePriceUsd} Usd</p>

        <div className=" flex flex-col items-center gap-3 ">
          <p>
            {shareDetail.workShare.totalShareBought}/
            {shareDetail.workShare.maxShareSupply}
          </p>
          <BuyShareDialog
            sharesTokenId={shareDetail.workShare.sharesTokenId}
            sharePriceUsd={shareDetail.workShare.sharePriceUsd}
          />
        </div>
      </div>
      
    </div>
  )
}

export default Artwork
