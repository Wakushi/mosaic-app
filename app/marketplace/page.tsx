"use client";

import { useQuery } from '@tanstack/react-query';
import { ShareDetail } from "@/types/artwork";
import Image from "next/image";
import { useState } from "react";
import Loader from "@/components/clientUi/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png";

const fetchSharesData = async (): Promise<ShareDetail[]> => {
  const response = await fetch("/api/shares");
  if (!response.ok) {
    throw new Error("Failed to fetch shares data");
  }
  return response.json();
};

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sharesData, error, isLoading } = useQuery<ShareDetail[], Error>({
    queryKey: ['sharesData'],
    queryFn: fetchSharesData,
  });

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredSharesData = sharesData?.filter((share) =>
    share.tokenizationRequest.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-300">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-screen flex flex-col justify-center items-center bg-white p-24 gap-4">
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
            {sharesData?.map((share, index) => (
              <CarouselItem key={index} className="w-full flex justify-center">
                <Card className="w-full h-[50vh] flex items-center justify-center ">
                  <CardContent className="w-full h-full flex items-center justify-center p-0">
                    <CustomImage
                      src={share.masterworksData.imageURL || IMAGE_FALLBACK}
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
        <div className="w-full px-4 ">
          <Input
            type="text"
            placeholder="Search by artist"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-1/4"
          />
        </div>
        <div className="flex flex-wrap grid grid-cols-3 gap-10 mt-4 justify-around">
          {filteredSharesData.map((share) => (
            <Link
              href={`/marketplace/artwork?id=${share.workShare.sharesTokenId}`}
              key={share.workShare.sharesTokenId}
              className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white"
            >
              <div className="flex-1">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const CustomImage = ({
  src,
  alt,
  fallbackSrc,
  ...props
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
      sizes="100vw"
      className="object-cover"
      {...props}
    />
  );
};
