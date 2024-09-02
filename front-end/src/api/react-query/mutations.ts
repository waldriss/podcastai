import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserInDB } from "../requests/AuthRequests";
import { UserToRegister } from "@/types/user";



export const useRegisterInDB = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userToRegister: UserToRegister) =>
        registerUserInDB(userToRegister),
      onSuccess: ({ data, variables }) => {
  
      },
    });
  };
  