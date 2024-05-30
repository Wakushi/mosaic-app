"use client"

import { useQuery } from "@tanstack/react-query"
import { ShareDetail } from "@/types/artwork"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Canvas } from "@react-three/fiber"
import Experience from "@/components/canvas/Canvas"
import Loader from "@/components/clientUi/Loader"
import { useState } from "react"
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Modal } from "@/components/clientUi/modal"
import { ProfileForm } from "@/components/profile-form"

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png"

const fetchSharesData = async (): Promise<ShareDetail[]> => {
  const response = await fetch("/api/shares")
  if (!response.ok) {
    throw new Error("Failed to fetch shares data")
  }
  return response.json()
}

export default function Home() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  const {
    data: sharesData,
    error,
    isLoading,
  } = useQuery<ShareDetail[], Error>({
    queryKey: ["sharesData"],
    queryFn: fetchSharesData,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <Hero />

      <Section title="" animate={false}>
        <div className="flex items-center w-full">
          <div className="flex-2 max-w-[55%] flex flex-col w-full gap-4">
            <h2 className="font-extrabold leading-none text-[5vw] uppercase">
              What is asset tokenization ?
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-2xl">
                Representing the ownership rights of a real-life asset with a
                token on the blockchain.
              </p>
              <p className="text-2xl">
                A token then serves as a certificate of ownership that can
                represent any valuable object, whether physical (like a
                painting) or digital (like a stock).
              </p>
              <p className="text-2xl">
                The blockchain ensures that the owner has full custody of this
                asset as long as it is placed in their own wallet.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full h-[50vh] relative">
            <Canvas>
              <Experience />
            </Canvas>
          </div>
        </div>
      </Section>

      <Section title="" animate={false} bgWhite>
        <Link className="self-start" href={"/marketplace"}>
          <h2 className="self-start text-[5vw] leading-none font-extrabold uppercase text-gray-800">
            Dive into a{" "}
            <span className="bg-gradient-to-r from-black dark:from-green-200 dark:via-green-400 dark:to-green-200 via-green-600 to-black bg-clip-text font-display tracking-tight text-transparent">
              vibrant
            </span>{" "}
            <span className="underline-thin">marketplace</span>
          </h2>
        </Link>
        <p className="self-start text-2xl text-gray-700 mb-2">
          Buy and sell fractional shares of tokenized real-world assets
        </p>
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

      <Section title="" animate={false}>
        <h2 className="self-start font-extrabold leading-none text-[5vw] uppercase mb-8">
          Why tokenizing assets ?
        </h2>
        <div className="grid grid-cols-2 gap-4 w-full justify-center">
          <div className="flex flex-col gap-4 rounded border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all bg-white">
            <h3 className="font-bold text-4xl">
              Permissionless, free access liquidity
            </h3>
            <p>
              Tokenization allows anyone in the world, regardless of social
              status, gender, age, religion, or nationality, to buy and sell
              assets without the need for an intermediary.
            </p>
          </div>
          <div className="flex flex-col gap-4  rounded border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all bg-white">
            <h3 className="font-bold text-4xl">Blockchain transparency</h3>
            <p>
              Unlike traditional purchase and sale registers that can be private
              and controlled, tokenized assets and their movements are visible
              to everyone, reducing investment and fraud risks due to the
              immutable nature of the blockchain.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all bg-white">
            <h3 className="font-bold text-4xl">
              Reducing transaction friction
            </h3>
            <p>
              Purchasing a tokenized asset is simple and fast through smart
              contracts, unlike traditional asset transactions which can be
              lengthy and complicated, also reducing administrative costs.
            </p>
          </div>
          <div className="flex flex-col gap-4  rounded border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all bg-white">
            <h3 className="font-bold text-4xl">
              Increasing liquidity and expanding the buyer pool
            </h3>
            <p>
              Tokenizing and fractionating RWAs make these assets more
              accessible. This creates a new, faster, more secure, and reliable
              infrastructure for recording and tracking assets, enabling 24/7
              trading.
            </p>
          </div>
        </div>
      </Section>

      <Section title="" animate={false} bgWhite>
        <h2 className="self-start font-extrabold leading-none text-[5vw] uppercase mb-8">
          About art traceability
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-2xl text-gray-600">
              Art traceability has always been a significant concern for gallery
              owners, collectors, and investors. The difficulty in tracking the
              history of transactions and ownership of a piece of art often
              leads to issues of forgery, theft, and disputes over ownership.
              Moreover, the lack of transparency and accurate documentation can
              discourage potential investors and compromise the value and
              reputation of art collections.
            </p>
            <p className="text-2xl text-gray-600 mt-4">
              By leveraging blockchain technology, we provide an innovative
              solution to this problem, offering a secure and transparent method
              for tracking the provenance and transactions of artworks.
            </p>
          </div>
          <div className="lg:w-1/2 h-[50vh] relative">
            <Image
              src="/problem.webp"
              alt="Art Traceability Problem"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </Section>

      <Section title="" animate={false}>
        <h2 className="self-start font-extrabold leading-none text-[5vw] uppercase mb-8">
          How do we proceed ?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Step
            stepNumber="1"
            title="Consultation"
            description="Begin by reaching out through our platform. We'll discuss your specific needs, the artwork you wish to tokenize, how our service can benefit you, and organize a meeting with an art appraiser."
          />
          <Step
            stepNumber="2"
            title="Expert Appraisal"
            description="Our art appraiser will evaluate the artwork's authenticity, condition, and market value. This appraisal is essential for determining the artwork's tokenization value and confirming its eligibility for our service."
          />
          <Step
            stepNumber="3"
            title="Tokenization"
            description="We leverage Chainlink and OpenAI services to verify the artwork's authenticity on-chain by computing the data you provided along with the expert appraisal and external market data. This process ensures that the artwork is accurately represented by the NFT."
          />
          <Step
            stepNumber="4"
            title="Legal Setup"
            description="For each artwork, we help you establish a Limited Liability Company (LLC) that legally owns the artwork. This LLC ownership is binded to the token minted on our contract, ensuring that the NFT holder has a stake in the artwork's future financial returns."
          />
          <Step
            stepNumber="5"
            title="Control and Management"
            description="Holding the NFT allows you to retain control over the LLC. Sell fractional shares to investors, providing them with a stake in the artwork's future financial returns."
          />
          <Step
            stepNumber="6"
            title="Fractionalization"
            description="Our platform enables you to tokenize artwork into fractional shares, making it possible to sell portions of the artwork to multiple investors. This approach increases liquidity and broadens your reach to a larger audience of potential buyers."
          />
          <Step
            stepNumber="7"
            title="Marketplace Integration"
            description="Both the NFT and fractional shares can be listed on our secure trading platform, allowing for open trading and liquidity. Investors can buy and sell shares of the artwork, and you can track the artwork's value and ownership in real-time."
          />
          <Step
            stepNumber="8"
            title="Long-term Management"
            description="We continue to offer support and advice, helping you manage the LLC, adjust to market conditions, and plan future steps for your tokenized artwork."
          />
        </div>
      </Section>

      <Section title="" animate={false}>
        <h2 className="font-extrabold leading-none text-[5vw] uppercase mb-8">
          Simplify art investment
        </h2>
        <p className="text-2xl max-w-[90%] text-center px-4 text-gray-700 mb-5">
          Our platform democratizes art investment, making it accessible to a
          broader audience while providing galleries with a novel way to manage
          and monetize their collections. By leveraging blockchain technology,
          we ensure security, transparency, and efficiency in all transactions.
        </p>
        <div className="flex gap-4 w-full items-center justify-center">
          <>
            <Button
              className="w-full max-w-[200px] text-[1.1rem]"
              onClick={toggleModal}
            >
              {" "}
              I'm an art collector
            </Button>
            <Modal isOpen={modalOpen} close={toggleModal}>
              <ProfileForm />
            </Modal>
          </>
          <Button
            className="w-full max-w-[200px] text-[1.1rem]"
            onClick={() => router.push("/marketplace")}
          >
            I'm an investor
          </Button>
        </div>
        <div className="w-full h-[50vh] relative">
          <Canvas>
            <Experience />
          </Canvas>
        </div>
      </Section>
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  bgWhite?: boolean
  animate?: boolean
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  bgWhite = false,
  animate = true,
}) => (
  <section
    className={`w-screen flex flex-col min-h-[100vh] justify-center items-center p-24 gap-4 ${
      animate ? "transform transition duration-500" : ""
    } ${bgWhite ? "bg-white" : "bg-gray-100"}`}
  >
    <h2 className="text-4xl font-semibold text-gray-800 mb-8">{title}</h2>
    {children}
  </section>
)

interface StepProps {
  stepNumber: string
  title: string
  description: string
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description }) => (
  <div className="flex flex-col gap-4  rounded border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all bg-white">
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
      Step {stepNumber}: {title}
    </h3>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
)

interface CustomImageProps {
  src: string
  alt: string
  fallbackSrc: string
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fallbackSrc,
  ...props
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
      className="object-cover rounded-lg"
      {...props}
    />
  )
}
