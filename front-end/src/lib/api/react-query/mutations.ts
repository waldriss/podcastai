import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserInDB } from "../requests/AuthRequests";
import { UserToRegister } from "@/lib/types/user";
import { createQuote, deleteQuote, generateAudio, generateImage } from "../requests/QuoteRequests";
import { CreateQuoteParams, GenerateAudioParams } from "@/lib/types/quote";
import { GetToken } from "@/lib/types";

export const useRegisterInDB = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userToRegister: UserToRegister) =>
      registerUserInDB(userToRegister),
    onSuccess: ({ data, variables }) => {},
  });
};

export const useGenerateAudio = (getToken:GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (generateAudioParams: GenerateAudioParams) =>
      generateAudio(generateAudioParams,getToken),
    onSuccess: (data ) => {},
  });
};

export const useGenerateImage = (getToken:GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({prompt}:{prompt:string}) =>
      generateImage({prompt},getToken),
    onSuccess: (data ) => {},
  });
};

export const useCreateQuote = (getToken:GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createQuoteParams:CreateQuoteParams) =>
      createQuote(createQuoteParams,getToken),
    onSuccess: (data ) => {},
  });
};
export const useDeleteQuote = (getToken:GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}:{id:number}) =>
      deleteQuote(id,getToken),
    onSuccess: (data ) => {},
  });
};

