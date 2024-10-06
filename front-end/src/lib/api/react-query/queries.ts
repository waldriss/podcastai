import {
    useQuery
  } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { TAuthenticatedUser } from "@/lib/types/user";
import { getAuth } from "../requests/AuthRequests";
import { GetToken } from "@/lib/types";
import { TrendingQuote } from "@/lib/types/quote";
import { getTrendingQuotes } from "../requests/QuoteRequests";
export const useGetAuthenticatedUser = (initialUser:TAuthenticatedUser|undefined,getToken:GetToken,userId?:string|null) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER,userId,getToken],
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
      queryKey: [QUERY_KEYS.GET_TRENDING_QUOTES,getToken],
      queryFn: () => getTrendingQuotes( getToken),
      initialData: initialTrendingQuotes,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 100,
    });
  };