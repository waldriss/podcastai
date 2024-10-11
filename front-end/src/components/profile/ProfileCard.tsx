"use client";
import { UseAudio } from "@/lib/store/store";
import {  ProfileQuote } from "@/lib/types/quote";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../global/Loader";
import { Button } from "../ui/button";
import profileIcon from '@icons/profile.svg'


const ProfileCard = ({
  quotes,
  imageUrl,
  name,
  quotesNumber
}: {quotes:ProfileQuote[],imageUrl?:string,name:string,quotesNumber:number}) => {
  const { setAudio } = UseAudio();

  const [randomQuote, setRandomQuote] = useState<ProfileQuote | null>(null);

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);

    setRandomQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    if (randomQuote) {
      setAudio({
        title: randomQuote.title,
        audioUrl: randomQuote.audioUrl || "",
        imageUrl: randomQuote.imageUrl || "",
        authorName: name,
        quoteId: randomQuote.id,
      });
    }
  }, [randomQuote, setAudio]);

 

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl||profileIcon}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
        
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {name}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
          <h2 className="text-16 font-semibold text-white-1">
            {quotesNumber} &nbsp;
            <span className="font-normal text-white-2">Quotes created</span>
          </h2>
        </figure>
        {quotes.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play a random podcast
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;