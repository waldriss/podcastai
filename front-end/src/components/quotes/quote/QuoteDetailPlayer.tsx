import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UseAudio } from "@/lib/store/store";
import { QuoteDetailPlayerProps } from "@/lib/types/quote";
import Image from "next/image";
import { useRouter } from "next/navigation";
import profileimg from "@icons/profile.svg";
import React, { useState } from "react";
import { useDeleteQuote } from "@/lib/api/react-query/mutations";
import { useAuth } from "@clerk/nextjs";

const QuoteDetailPlayer = ({
  audioUrl,
  author,
  id,
  imageUrl,
  isOwner,
  title,
}: QuoteDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = UseAudio();
  const { toast } = useToast();
  const { getToken } = useAuth();
  const [showDeleteButton,setShowDeleteButton]=useState(false)
  const { mutateAsync: deleteQuote, isPending: isDeleting } =
    useDeleteQuote(getToken);

  const handleDelete = async () => {
    try {
      await deleteQuote({ id });
      toast({
        title: "quote deleted",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting quote", error);
      toast({
        title: "Error deleting quote",
        variant: "destructive",
      });
    }
  };

  const handlePlay = () => {
    setAudio({
      title: title,
      audioUrl,
      imageUrl,
      authorName: author.name,
      quoteId: id,
    });
  };

  if (!imageUrl) return <Loader />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {title}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${author.id}`);
              }}
            >
              <Image
                src={author?.imageUrl || profileimg}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">
                {author.name}
              </h2>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setShowDeleteButton((prev) => !prev)}
          />
          {showDeleteButton && (
            <div
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
              onClick={handleDelete}
            >
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-white-1">Delete</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteDetailPlayer;
