"use client"

import { ShareDetail } from "@/types/artwork"
import Image from "next/image"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader" // Assurez-vous que ce chemin est correct

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

export default function Marketplace() {
  const [sharesData, setSharesData] = useState<ShareDetail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSharesData() {
      const shareRequest = await fetch("/api/shares")
      const data = await shareRequest.json()
      console.log(data)
      if (data) {
        setSharesData(data)
        setLoading(false)
      }
    }

    fetchSharesData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-white to-gray-300 min-h-screen py-20 px-14">
      <h1>Marketplace</h1>
      <div className="flex flex-wrap gap-2">
        {sharesData.map((share) => (
          <div
            key={share.workShare.workTokenId}
            className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center"
          >
            <div className="max-w-[400px] flex-1">
              <CustomImage
                src={share.masterworksData.imageURL || IMAGE_FALLBACK}
                alt="work"
                fallbackSrc={IMAGE_FALLBACK}
              />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center flex-1">
              <h2>{share.tokenizationRequest.certificate.work}</h2>
              <p>{share.tokenizationRequest.certificate.artist}</p>
              <p>${share.workShare.sharePriceUsd}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CustomImage = ({
  src,
  alt,
  fallbackSrc,
  ...props
}: {
  src: string
  alt: string
  fallbackSrc: string
}) => {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
      sizes="100vw"
      {...props}
    />
  )
}
