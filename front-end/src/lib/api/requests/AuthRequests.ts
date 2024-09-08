import { GetToken } from "@/lib/types";
import { UserToRegister } from "@/lib/types/user";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const registerUserInDB = async ({
  email,
  name,
  password,
}: UserToRegister) => {
  try {


    const res = await fetch(`${backendUrl}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(error.message);
    } else {
      return res.json();
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const SigInOrSignUpGoogleInDB = async (
  email: string,
  name: string,
  userId: string
) => {
  try {
    const res = await fetch(`${backendUrl}auth-google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, userId }),
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(error.message);
    } else {
      return res.json();
    }
  } catch (error) {
    throw error;
  }
};


export const getAuth = async (userId: string|undefined|null,getToken:GetToken) => {
  try {
    
    const token=await getToken();
   
 
    
    const userResponse = await fetch(`${backendUrl}auth/${userId}`, {
      cache: "default",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    });
    const userData = await userResponse.json();
   
   
    if (userResponse.ok) {
     
      

      return userData.user;
    } else {
      throw new Error(userData.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideAuth = async (userId: string,token:string|null) => {
  try {
    const userResponse = await fetch(`${backendUrl}authenticatedUser/${userId}`, {
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      }
    });
    const userData = await userResponse.json();
    if (userResponse.ok) {
      

      return userData.user;
    } else {
      throw new Error(userData.message);
    }
  } catch (error) {
    console.log(error);
  }
};