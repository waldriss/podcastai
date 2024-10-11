import ProfileInfos from '@/components/profile/ProfileInfos';
import { getServerAuthor } from '@/lib/api/requests/UsersRequests';
import { AuthorDetails } from '@/lib/types/user';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async ({params}:{params:{profileId:string}}) => {
    const { getToken } = auth();
    const token = await getToken();
    let initialAuthor: AuthorDetails|undefined;
    if(token) initialAuthor=await getServerAuthor(params.profileId,token);
    
  return (
    <>
    {initialAuthor&&<ProfileInfos initialAuthor={initialAuthor} authorId={params.profileId} />}
    </>
  )
}

export default page