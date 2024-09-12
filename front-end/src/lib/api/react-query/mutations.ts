import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserInDB } from "../requests/AuthRequests";
import { UserToRegister } from "@/lib/types/user";
import { generateAudio, generateImage } from "../requests/PodcastRequests";
import { GenerateAudioParams } from "@/lib/types/podcast";
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
