import QuoteInfos from "@/components/quotes/quote/QuoteInfos"
import { getServerQuoteById } from "@/lib/api/requests/QuoteRequests";
import { Quote } from "@/lib/types/quote";
import { auth } from "@clerk/nextjs/server";


const QuoteInfosPage = async ({params}:{params:{quoteId:string}}) => {
  const { getToken } = auth();
  const token = await getToken();
  let intialQuote: Quote|undefined;
  if (token) intialQuote = await getServerQuoteById(params.quoteId,token);
  return (
    <section className="flex w-full flex-col">
      <QuoteInfos quoteId={params.quoteId} intialQuote={intialQuote} />

  </section>
  )
}

export default QuoteInfosPage