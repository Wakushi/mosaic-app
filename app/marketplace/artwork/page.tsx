"use client"

import { useEffect, useState } from "react"
import { ShareDetail } from "@/types/artwork"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Loader from "@/components/Loader"
import BuyShareDialog from "@/components/marketplace/BuyShareDialog"

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
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!shareDetail) {
    return <div>No details available</div>
  }

  return (
    <div className="min-h-screen  flex py-20 px-14 ">
      <div className="w-1/2 flex flex-col gap-4 h-[50vh]">
        <h1 className="text-8xl self-start">
          {shareDetail.tokenizationRequest.certificate.work}
        </h1>
        <p className="text-2xl">
          {shareDetail.tokenizationRequest.certificate.artist}
        </p>
        <p>{shareDetail.masterworksData.medium}</p>

        <p className="text-slate-400">
          Owner: {shareDetail.tokenizationRequest.owner}
        </p>
        <p>Price: {shareDetail.workShare.sharePriceUsd} Usd</p>

        <div className="mt-auto flex flex-col items-center gap-3 ">
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
      <div className="w-1/2 ">
        <div className=" p-10 h-[50vh] bg-white">
          <Image
            src={shareDetail.masterworksData.imageURL || IMAGE_FALLBACK}
            alt={shareDetail.tokenizationRequest.certificate.artist}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
            className=""
          />
        </div>
        <p className="text-center">{shareDetail.masterworksData.dimensions}</p>
      </div>
    </div>
  )
}

export default Artwork
