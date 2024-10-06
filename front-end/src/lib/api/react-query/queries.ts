import {
    useQuery
  } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { TAuthenticatedUser } from "@/lib/types/user";
import { getAuth } from "../requests/AuthRequests";
import { GetToken } from "@/lib/types";
import { Quote, TrendingQuote } from "@/lib/types/quote";
import { getQuoteById, getTrendingQuotes } from "../requests/QuoteRequests";
export const useGetAuthenticatedUser = (initialUser:TAuthenticatedUser|undefined,getToken:GetToken,userId?:string|null) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER,userId],
      queryFn: () => getAuth( userId,getToken),
      initialData: initialUser,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 100,
      enabled:!!userId
    });
  };

  export const useGetTrendingQuotes = (initialTrendingQuotes:TrendingQuote[]|undefined,getToken:GetToken) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_TRENDING_QUOTES],
      queryFn: () => getTrendingQuotes( getToken),
      initialData: initialTrendingQuotes,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 100,
    });
  };

  export const useGetQuoteById = (quoteId:string,initialQuote:Quote|undefined,getToken:GetToken) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_QUOTE_BY_ID,quoteId],
      queryFn: () => getQuoteById(quoteId,getToken),
      initialData: initialQuote,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 100,
    });
  };