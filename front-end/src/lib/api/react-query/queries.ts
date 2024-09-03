import {
    useQuery
  } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { TAuthenticatedUser } from "@/lib/types/user";
import { getAuth } from "../requests/AuthRequests";
import { GetToken } from "@/lib/types";
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