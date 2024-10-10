
import DiscoverQuotes from "@/components/discover/DiscoverQuotes";
import { getServerQuotes } from "@/lib/api/requests/QuoteRequests";
import { DiscoverQuote } from "@/lib/types/quote";

import { auth } from "@clerk/nextjs/server";
import React from "react";

const Discover = async () => {
  const {getToken}=auth()
  const token = await getToken()
  let quotes:DiscoverQuote[]|undefined
  if(token) quotes= await getServerQuotes("",token);


  return (
    <>
    <DiscoverQuotes initialDiscoverQuotes={quotes} />
    </>
  );
};

export default Discover;
