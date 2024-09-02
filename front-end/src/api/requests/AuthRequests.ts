import { UserToRegister } from "@/types/user";

const backendUrl=process.env.BACKEND_URL
export const registerUserInDB = async (
    { email,
     name,
     password
   }:UserToRegister
   ) => {
     try {
     
       const res = await fetch(`${backendUrl}register`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, name,password }),
       });
   
   
       if (!res.ok) {
         const error=await res.json();
         
         throw new Error(error.message);
       }
       else{
           return res.json();
       }
     } catch (error) {
       console.log(error);
       
       throw error
     }
   };
   
   
   export const SigInOrSignUpGoogleInDB = async (
     email: string,
     name: string,
     userId:string,
   ) => {
     try {
       const res = await fetch(`${backendUrl}SigInOrSignUpGoogle`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, name,userId }),
       });
   
       if (!res.ok) {
         const error=await res.json();
         
         throw new Error(error.message);
       }
       else{
           return res.json();
       }
     } catch (error) {
       
       throw error
     }
   };