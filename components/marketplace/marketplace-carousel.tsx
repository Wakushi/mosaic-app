// components/MarketplaceCarousel.tsx
import React, { ReactNode} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";



interface MarketplaceCarouselProps {
	children: ReactNode;
  }

const MarketplaceCarousel: React.FC<MarketplaceCarouselProps> = ({children}) => {
  return (
    <Carousel
	opts={{
		loop: true,
	  }}
	  
      className="w-full"
    >
      <CarouselContent className="flex gap-4">
       
		{children}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MarketplaceCarousel;

