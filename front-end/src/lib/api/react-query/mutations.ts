import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserInDB } from "../requests/AuthRequests";
import { UserToRegister } from "@/lib/types/user";
import {
  createQuote,
  deleteQuote,
  generateAudio,
  generateImage,
} from "../requests/QuoteRequests";
import { CreateQuoteParams, GenerateAudioParams } from "@/lib/types/quote";
import { GetToken } from "@/lib/types";
import { QUERY_KEYS } from "./queryKeys";
import { changeProfileImage } from "../requests/UsersRequests";

export const useRegisterInDB = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userToRegister: UserToRegister) =>
      registerUserInDB(userToRegister),
    onSuccess: ({ data, variables }) => {},
  });
};

export const useGenerateAudio = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (generateAudioParams: GenerateAudioParams) =>
      generateAudio(generateAudioParams, getToken),
    onSuccess: (data) => {},
  });
};

export const useGenerateImage = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prompt }: { prompt: string }) =>
      generateImage({ prompt }, getToken),
    onSuccess: (data) => {},
  });
};

export const useCreateQuote = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createQuoteParams: CreateQuoteParams) =>
      createQuote(createQuoteParams, getToken),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_AUTHOR] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTES_BY_VOICE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTE_BY_ID] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TOP_AUTHORS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TRENDING_QUOTES] });
    },
  });
};
export const useDeleteQuote = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteQuote(id, getToken),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_AUTHOR] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTES_BY_VOICE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_QUOTE_BY_ID] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TOP_AUTHORS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TRENDING_QUOTES] });
    },
  });
};

export const useChangeProfileImage = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({imageUrl}:{imageUrl:string}) =>
      changeProfileImage(imageUrl,getToken),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_AUTHOR] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER] });
      
    },
  });
};
