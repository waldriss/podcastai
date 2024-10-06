
import {create  } from "zustand"
import { TAuthenticatedUser } from "../types/user";







interface AuthenticatedUserContext {
    authenticatedUser:TAuthenticatedUser|undefined;
    setauthenticatedUser:(authenticatedUser:TAuthenticatedUser|undefined)=>void

}





export const UseAuthenticatedUser=create<AuthenticatedUserContext>()((set)=>({
    authenticatedUser:undefined,
    setauthenticatedUser:(authenticatedUser:TAuthenticatedUser|undefined)=>set({authenticatedUser}),
}))


