"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";
import { UseAudio } from "@/lib/store/store";
import { Progress } from "../ui/progress";
import { X } from "lucide-react";

const QuotePlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio,setAudio } = UseAudio();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration
    ) {
      if (audioRef.current.currentTime + 2 > audioRef.current.duration) {
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
        setIsPlaying(false);
       
      }
      else{
        audioRef.current.currentTime += 2;
      }
     
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 2 > 0) {
      audioRef.current.currentTime -= 2;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);
  const handleLoadedMetadata = () => {
   
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}
    >
      {/* change the color for indicator inside the Progress component in ui folder */}
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full h-1 text-orange-1"
        color="orange"
        max={duration}
      />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/quotes/${audio?.quoteId}`}>
            <Image
              src={audio?.imageUrl! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">
              {audio?.authorName}
            </p>
          </div>
        </div>
        <div className="flex-center gap-3 md:gap-6">
          <div
            onClick={rewind}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <Image
              src={"/icons/reverse.svg"}
              width={24}
              height={24}
              alt="rewind"
            />
            <h2 className="text-12 font-bold text-white-4">-2</h2>
          </div>
          <Image
            className="cursor-pointer"
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            width={30}
            height={30}
            alt="play"
            onClick={togglePlayPause}
          />
          <div
            onClick={forward}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <h2 className="text-12 font-bold text-white-4">+2</h2>
            <Image
              src={"/icons/forward.svg"}
              width={24}
              height={24}
              alt="forward"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            {formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={24}
              height={24}
              alt="mute unmute"
              onClick={toggleMute}
              className="cursor-pointer"
            />
          </div>
          <div onClick={()=>setAudio(undefined)} className="absolute right-3 cursor-pointer">
            <X className="text-white-1 opacity-60"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePlayer;
