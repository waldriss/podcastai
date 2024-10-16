import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../global/Loader";
import { ExploreQuote } from "@/lib/types/quote";

interface CarouselProps {
  quote: ExploreQuote;
  authorName: string;
}

const Carousel = ({
  exploreQuotes_withName,
}: {
  exploreQuotes_withName: CarouselProps[];
}) => {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void);

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  if (!exploreQuotes_withName) return <Loader />;

  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden pt-2"
      ref={emblaRef}
    >
      <div className="flex">
        {exploreQuotes_withName
          .slice(0, 3)
          .map(({ quote: exploreQuote, authorName }) => (
            <div className="carousel_box">
              <figure
                key={exploreQuote.id}
                className="px-2"
                onClick={() => router.push(`/quotes/${exploreQuote.id}`)}
              >
                <div className="absolute pr-2 top-0 flex justify-center items-center">
                  <Image
                    src={exploreQuote.imageUrl}
                    alt="card"
                    fill
                    className="!w-full h-full !relative rounded-xl"
                  />
                </div>

                <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
                  <h2 className="text-14 font-semibold text-white-1">
                    {exploreQuote.title}
                  </h2>
                  <p className="text-12 font-normal text-white-2">
                    {authorName}
                  </p>
                </div>
              </figure>
            </div>
          ))}
      </div>
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
