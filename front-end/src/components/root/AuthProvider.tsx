"use client";
import { useGetAuthenticatedUser } from "@/lib/api/react-query/queries";
import { UseAuthenticatedUser } from "@/lib/store/store";
import { TAuthenticatedUser } from "@/lib/types/user";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useCallback, useEffect } from "react";

const AuthProvider = ({
  initialAuthenticatedUser,
  children,
  
}: Readonly<{
  initialAuthenticatedUser?:TAuthenticatedUser
  children: React.ReactNode;
  
}>) => {
  const { user } = useUser();
  const { getToken} = useAuth();

  const { data: authenticatedUser } = useGetAuthenticatedUser(
    initialAuthenticatedUser,
    getToken,
    user?.externalId
  ) as { data: TAuthenticatedUser};

  const { setauthenticatedUser } = UseAuthenticatedUser();

  const setAuthenticatedUser = useCallback(() => {
    setauthenticatedUser(authenticatedUser);
  }, [authenticatedUser, setauthenticatedUser]);

  useEffect(() => {
    setAuthenticatedUser();
  }, [setAuthenticatedUser]);

  return <>{children}</>;
};

export default AuthProvider;
