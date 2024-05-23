"use client";
import Experience from "@/components/canvas/Canvas";
import { Canvas } from "@react-three/fiber";
import { ShareDetail } from "@/types/artwork";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png";

export default function Home() {
  const [sharesData, setSharesData] = useState<ShareDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSharesData() {
      const shareRequest = await fetch("/api/shares");
      const data = await shareRequest.json();
      console.log(data);
      if (data) {
        setSharesData(data);
        setLoading(false);
      }
    }

    fetchSharesData();
  }, []);
  console.log(sharesData);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex pl-14 border-b justify-center bg-gradient-to-r from-white to-gray-300">
        <div className="w-1/2 flex flex-col mt-16 justify-center h-[60vh]">
          <div className="flex flex-col gap-5">
            <h1 className="text-8xl">Mosaic</h1>
            <p className="break-words text-slate-400">gkjbsdfkgbq</p>
            <h2 className="text-5xl">Security and traceability</h2>
            <p className="text-xl break-words">
              Tokenize your artworks for enhanced security and traceability,
              allowing galleries to secure their collections and individuals to
              invest by purchasing shares of tokenized art. Mosaic offers a new
              way to secure and track artworks while enabling multiple people to
              become co-owners.
            </p>
          </div>
        </div>
        <div className="w-1/2 h-[60vh] mt-24">
          <Canvas>
            <Experience />
          </Canvas>
        </div>
      </div>
      <section>
        <div className="w-screen flex flex-col justify-center items-center bg-white p-24 gap-4">
          <Link className="self-start" href={"/marketplace"}>
            <h2 className="self-start text-4xl ">Marketplace</h2>
          </Link>
          <h3 className="text-2xl">New Arrivals</h3>
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
              {sharesData.map((share, index) => (
                <CarouselItem
                  key={index}
                  className="w-full flex justify-center"
                >
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
      </section>
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
