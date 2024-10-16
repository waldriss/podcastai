import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { AuthorDetails, TAuthenticatedUser, TopAuthor } from "@/lib/types/user";
import { getAuth } from "../requests/AuthRequests";
import { GetToken } from "@/lib/types";
import {
  DiscoverQuote,
  Quote,
  SimilarVoiceQuote,
  TrendingQuote,
  Voice,
} from "@/lib/types/quote";
import {
  getQuoteById,
  getQuotes,
  getQuotesByVoice,
  getTrendingQuotes,
} from "../requests/QuoteRequests";
import { getAuthor, getTopAuthors } from "../requests/UsersRequests";
export const useGetAuthenticatedUser = (
  initialUser: TAuthenticatedUser | undefined,
  getToken: GetToken,
  userId?: string | null
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER, userId],
    queryFn: () => getAuth(userId, getToken),
    initialData: initialUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
    enabled: !!userId,
  });
};

export const useGetTrendingQuotes = (
  initialTrendingQuotes: TrendingQuote[] | undefined,
  getToken: GetToken
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRENDING_QUOTES],
    queryFn: () => getTrendingQuotes(getToken),
    initialData: initialTrendingQuotes,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};

export const useGetQuoteById = (
  quoteId: string,
  initialQuote: Quote | undefined,
  getToken: GetToken
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_QUOTE_BY_ID, quoteId],
    queryFn: () => getQuoteById(quoteId, getToken),
    initialData: initialQuote,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};

export const useGetQuotesByVoice = (
  initialQuotes: SimilarVoiceQuote[] | undefined,
  getToken: GetToken,
  voice: Voice
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_QUOTES_BY_VOICE,voice],
    queryFn: () => getQuotesByVoice(voice, getToken),
    initialData: initialQuotes,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};
export const useGetTopAuthors = (
  initialTopAuthors: TopAuthor[] | undefined,
  getToken: GetToken
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_AUTHORS],
    queryFn: () => getTopAuthors(getToken),
    initialData: initialTopAuthors,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};
export const useGetQuotes = (
  initialQuotes: DiscoverQuote[] | undefined,
  getToken: GetToken,
  search:string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_QUOTES,getToken,search],
    queryFn: () => getQuotes(search,getToken),
    initialData: initialQuotes,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};


export const useGetAuthor = (
  initialAuthor: AuthorDetails | undefined,
  getToken: GetToken,
  id:string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AUTHOR,id],
    queryFn: () => getAuthor(id,getToken),
    initialData: initialAuthor,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 100,
  });
};