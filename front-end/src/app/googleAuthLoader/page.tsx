import { SigInOrSignUpGoogleInDB } from "@/api/requests/AuthRequests";
import Loader from "@/components/global/Loader";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";


const page = async () => {

  const user = await currentUser();

  if (user) {
    try {
      const resp = await SigInOrSignUpGoogleInDB(user.emailAddresses[0].emailAddress,`${user.firstName} ${user.lastName}`,user.id);
      
    } catch (error) {
      console.log(error);
    }
    finally{
      redirect("/");
    }
  } else {
  }

  return (
    <div className="h-screen">
      <Loader/>
    </div>
  );
};

export default page;
