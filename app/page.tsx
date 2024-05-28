"use client";

import { useQuery } from '@tanstack/react-query';
import { ShareDetail } from "@/types/artwork";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/canvas/Canvas";
import Loader from "@/components/clientUi/Loader";
import { useState } from "react";

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png";

const fetchSharesData = async (): Promise<ShareDetail[]> => {
  const response = await fetch("/api/shares");
  if (!response.ok) {
    throw new Error("Failed to fetch shares data");
  }
  return response.json();
};

export default function Home() {
  const { data: sharesData, error, isLoading } = useQuery<ShareDetail[], Error>({
    queryKey: ['sharesData'],
    queryFn: fetchSharesData,
  });

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-white to-gray-300 p-8">
        <div className="lg:w-1/2 flex flex-col justify-center h-[60vh] p-8 animate-fadeIn">
          <h1 className="text-8xl text-gray-800 mb-4">Mosaic</h1>
          <p className="text-xl text-slate-500 mb-2">Revolutionizing Art Investment</p>
          <h2 className="text-5xl font-semibold text-gray-700 mb-4">Security and Traceability</h2>
          <p className="text-lg text-gray-600">
            Tokenize your artworks for enhanced security and traceability,
            allowing galleries to secure their collections and individuals to
            invest by purchasing shares of tokenized art. Mosaic offers a new
            way to secure and track artworks while enabling multiple people to
            become co-owners.
          </p>
        </div>
        <div className="lg:w-1/2 h-[60vh] mt-8 lg:mt-0 animate-slideIn">
          <Canvas>
            <Experience />
          </Canvas>
        </div>
      </div>

      <Section title="Problem: Art Traceability" animate={false}>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 h-[50vh] relative">
            <Image
              src="/problem.webp"
              alt="Art Traceability Problem"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-lg text-gray-600">
              Art traceability has always been a significant concern for gallery owners, collectors, and investors. The difficulty in tracking the history of transactions and ownership of a piece of art often leads to issues of forgery, theft, and disputes over ownership. Moreover, the lack of transparency and accurate documentation can discourage potential investors and compromise the value and reputation of art collections.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              By leveraging blockchain technology, we provide an innovative solution to this problem, offering a secure and transparent method for tracking the provenance and transactions of artworks.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How Our Art Tokenization and Fractionalization Works" animate={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Step
            stepNumber="1"
            title="Consultation"
            description="Engage with Us: Begin by reaching out through our platform. We'll discuss your specific needs, the artwork you wish to tokenize, and how our service can benefit you."
          />
          <Step
            stepNumber="2"
            title="Legal Setup"
            description="Form an LLC: For each artwork, we help you establish a Limited Liability Company (LLC) that legally owns the art. Transfer Art Ownership: You transfer ownership of the artwork to the newly formed LLC."
          />
          <Step
            stepNumber="3"
            title="Tokenization"
            description="Mint an NFT: We mint a Non-Fungible Token (NFT) representing ownership of the LLC. Tokenize the Artwork: Fractional ownership tokens (ERC-20) are minted to represent shares in the LLC."
          />
          <Step
            stepNumber="4"
            title="Control and Management"
            description="Maintain Control: Holding the NFT allows you to retain control over the LLC. Distribute Shares: Sell fractional shares to investors, providing them with a stake in the artwork's future financial returns."
          />
          <Step
            stepNumber="5"
            title="Marketplace Integration"
            description="Trading Platform Access: Both the NFT and fractional shares are listed on our secure trading platform, allowing for open trading and liquidity."
          />
          <Step
            stepNumber="6"
            title="Revenue and Reporting"
            description="Profit Sharing: Any profits from the sale or leasing of the artwork are distributed to the shareholders. Transparent Reporting: Regular reports and updates are provided to all stakeholders."
          />
          <Step
            stepNumber="7"
            title="Long-term Management"
            description="Ongoing Support: We continue to offer support and advice, helping you manage the LLC, adjust to market conditions, and plan future steps for your tokenized artwork."
          />
        </div>
      </Section>

      <Section title="Simplifying Art Investment" animate={false}>
        <p className="text-xl text-center px-4 text-gray-700">
          Our platform democratizes art investment, making it accessible to a broader audience while providing galleries with a novel way to manage and monetize their collections. By leveraging blockchain technology, we ensure security, transparency, and efficiency in all transactions.
        </p>
      </Section>

      <Section title="" animate={false}>
        <Link className="self-start" href={"/marketplace"}>
          <h2 className="self-start text-4xl font-semibold text-gray-800">Marketplace</h2>
        </Link>
        <h3 className="text-2xl text-center text-gray-700 mb-8">New Arrivals</h3>
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
              <CarouselItem
                key={index}
                className="w-full flex justify-center"
              >
                <Card className="w-full h-[50vh] flex items-center justify-center shadow-xl rounded-lg">
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
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  animate?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, animate = true }) => (
  <section className={`w-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-50 to-gray-200 p-24 gap-4 ${animate ? 'transform transition duration-500' : ''}`}>
    <h2 className="text-4xl font-semibold text-gray-800 mb-8">{title}</h2>
    {children}
  </section>
);

interface StepProps {
  stepNumber: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description }) => (
  <div className="w-full flex flex-col mb-8 p-6 border rounded-lg bg-white transform transition duration-300 hover:scale-105">
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step {stepNumber}: {title}</h3>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
);

interface CustomImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fallbackSrc,
  ...props
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
      className="object-cover rounded-lg"
      {...props}
    />
  );
};
