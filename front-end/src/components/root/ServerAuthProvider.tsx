import { getServerSideAuth } from '@/lib/api/requests/AuthRequests';
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import AuthProvider from './AuthProvider';
import { TAuthenticatedUser } from '@/lib/types/user';

const ServerAuthProvider = async({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const {getToken,sessionClaims}=auth()
  const token=await getToken();
  let initialAuthenticatedUser:TAuthenticatedUser|undefined
  if(sessionClaims?.userId){
    initialAuthenticatedUser=await getServerSideAuth(sessionClaims.userId,token);
    
  }

  return (
    <AuthProvider initialAuthenticatedUser={initialAuthenticatedUser} >
        {children}
    </AuthProvider>
  )
}

export default ServerAuthProvider