"use client";
import QuoteDetailPlayer from "@/components/quotes/quote/QuoteDetailPlayer";
import { useGetQuoteById, useGetQuotesByVoice } from "@/lib/api/react-query/queries";
import { UseAuthenticatedUser } from "@/lib/store/store";
import { Quote, SimilarVoiceQuote } from "@/lib/types/quote";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import EmptyState from "./EmptyState";
import QuoteCard from "@/components/root/QuoteCard";
const QuoteInfos = ({
  initialQuote,
  quoteId,
  initialSimilarVoiceQuotes
}: {
  initialQuote: Quote;
  quoteId: string;
  initialSimilarVoiceQuotes?:SimilarVoiceQuote[]
}) => {
  const { getToken } = useAuth();
  const { data: quote } = useGetQuoteById(quoteId, initialQuote, getToken);
  const {data:similarVoiceQuotes}=useGetQuotesByVoice(initialSimilarVoiceQuotes,getToken,quote?.voiceType||initialQuote.voiceType)
  const {authenticatedUser}=UseAuthenticatedUser()
  const isOwner=authenticatedUser?.id===quote?.userId
  return (
    <>
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currenty Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{quote?.views}</h2>
        </figure>
      </header>
      
      {quote && <QuoteDetailPlayer isOwner={isOwner} id={quote.id} audioUrl={quote.audioUrl} author={quote.user} imageUrl={quote.imageUrl} title={quote.title}  />}

     

      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {quote?.description}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {quote?.voicePrompt}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {quote?.imagePrompt}
          </p>
        </div>
      </div>
      
    <section className="mt-8 flex flex-col gap-5">
      <h1 className="text-20 font-bold text-white-1">Quotes with similar voice</h1>

      {similarVoiceQuotes && similarVoiceQuotes.length > 0 ? (
        <div className="quote_grid">
          {similarVoiceQuotes?.map(({ id, title, description,imageUrl }) => (
            <QuoteCard 
              key={id}
              imgUrl={imageUrl as string}
              title={title}
              description={description}
              quoteId={id}
            />
          ))}
        </div>
      ) : (
        <> 
          <EmptyState 
            title="No similar quotes found"
            buttonLink="/discover"
            buttonText="Discover more quotes"
          />
        </>
      )}
    </section>
    
    </>
  );
};

export default QuoteInfos;
