import QuoteInfos from "@/components/quotes/quote/QuoteInfos"
import { getServerQuoteById, getServerQuotesByVoice } from "@/lib/api/requests/QuoteRequests";
import { Quote, SimilarVoiceQuote } from "@/lib/types/quote";
import { auth } from "@clerk/nextjs/server";


const QuoteInfosPage = async ({params}:{params:{quoteId:string}}) => {
  const { getToken } = auth();
  const token = await getToken();
  let initialQuote: Quote|undefined;
  let initialSimilarVoiceQuotes:SimilarVoiceQuote[]|undefined
  if (token) {
    initialQuote = await getServerQuoteById(params.quoteId,token);
    if(initialQuote)
    initialSimilarVoiceQuotes=await getServerQuotesByVoice(initialQuote.voiceType,token);
  }
  return (
    <section className="flex w-full flex-col">
      {initialQuote&&<QuoteInfos quoteId={params.quoteId} initialQuote={initialQuote} initialSimilarVoiceQuotes={initialSimilarVoiceQuotes} />
      }

  </section>
  )
}

export default QuoteInfosPage