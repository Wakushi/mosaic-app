import Image from "next/image"
import { useState } from "react"

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
      className="object-cover"
      {...props}
    />
  )
}

export default CustomImage
