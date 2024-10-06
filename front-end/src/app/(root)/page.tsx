import QuoteCard from "@/components/root/QuoteCard";
import TrendingQuotes from "@/components/root/TrendingQuotes";
import { Button } from "@/components/ui/button";
import { getServerTrendingQuotes } from "@/lib/api/requests/QuoteRequests";
import { TrendingQuote } from "@/lib/types/quote";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { getToken } = auth();
  const token = await getToken();
  let initialTrendingQuotes: TrendingQuote[]|undefined;
  if (token) initialTrendingQuotes = await getServerTrendingQuotes(token);


  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Quotes</h1>
        <TrendingQuotes initialTrendingQuotes={initialTrendingQuotes} />
      </section>
    </div>
  );
};

export default page;
