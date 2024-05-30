"use client"
import { useContext, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { formatUnits } from "viem"
import CustomImage from "@/components/clientUi/CustomImage"
import Loader from "@/components/clientUi/Loader"
import { SharesContext } from "@/services/ShareContext"
import { ListedShareDetail } from "@/types/artwork"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const {
    initialShares,
    listedShares,
    initialSharesLoading,
    listedSharesLoading,
  } = useContext(SharesContext)

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const filteredInitialShares =
    initialShares?.filter((share) =>
      share.tokenizationRequest?.certificate?.artist
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || []

  const filteredListedShares =
    listedShares
      ?.flat()
      .filter((item) =>
        item.tokenizationRequest?.certificate?.artist
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) || []

  if (initialSharesLoading || listedSharesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-screen flex flex-col justify-center items-center p-24 pt-[8rem] gap-4">
        <h2 className="self-start text-4xl ">New Arrivals</h2>
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="w-full p-0">
            {initialShares?.map((share, index) => (
              <CarouselItem
                key={`carousel-item-${index}`}
                className="w-full flex justify-center"
              >
                <Card className="w-full h-[50vh] flex items-center justify-center ">
                  <CardContent className="w-full h-full flex items-center justify-center p-0">
                    <CustomImage
                      src={share.masterworksData?.imageURL || IMAGE_FALLBACK}
                      alt="work"
                      fallbackSrc={IMAGE_FALLBACK}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="self-start w-full py-10 px-24">
        <div className="w-full flex items-center gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search by artist"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-1/4 bg-white"
          />
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl uppercase font-semibold">
                Initial Offering
              </h2>
              <p className="text-xl text-gray-700">
                Browse the collection of fractionalized art shares offered by
                the galleries, available for initial purchase.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10 justify-around">
              {filteredInitialShares.map((share) => (
                <Link
                  href={`/marketplace/initial-share/${share.workShare.sharesTokenId}`}
                  key={`share-${share.workShare.sharesTokenId}`}
                  className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white max-h-[350px]"
                >
                  <div className="flex-1 w-full h-[200px]">
                    <CustomImage
                      src={share.masterworksData?.imageURL || IMAGE_FALLBACK}
                      alt="work"
                      fallbackSrc={IMAGE_FALLBACK}
                    />
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center flex-1">
                    <h2>{share.tokenizationRequest?.certificate?.work}</h2>
                    <p>{share.tokenizationRequest?.certificate?.artist}</p>
                    <p>
                      $
                      {formatUnits(
                        BigInt(share.workShare.sharePriceUsd || 0),
                        18
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl uppercase font-semibold">
                Secondary Market
              </h2>
              <p className="text-xl text-gray-700">
                Discover and trade fractionalized art shares on the secondary
                market.
              </p>
            </div>
            {filteredListedShares.length ? (
              <ListedSharesList shares={filteredListedShares} />
            ) : (
              <div>
                <p className="text-xl text-gray-700">No shares found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ListedSharesList = ({ shares }: { shares: ListedShareDetail[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10 justify-around">
      {shares.map((listedShareDetail, index) => (
        <Link
          href={`/marketplace/listed-share/${listedShareDetail.listedShare.itemId}`}
          key={`listed-item-${index}`}
          className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white max-h-[350px]"
        >
          <div className="flex-1 w-full h-[200px]">
            <CustomImage
              src={
                listedShareDetail.masterworksData?.imageURL || IMAGE_FALLBACK
              }
              alt="work"
              fallbackSrc={IMAGE_FALLBACK}
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center flex-1">
            <h2>{listedShareDetail.tokenizationRequest?.certificate?.work}</h2>
            <p>{listedShareDetail.tokenizationRequest?.certificate?.artist}</p>
            <p>
              $
              {formatUnits(
                BigInt(listedShareDetail.workShare.sharePriceUsd || 0),
                18
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
