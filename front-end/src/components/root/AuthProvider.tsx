"use client";
import { useGetAuthenticatedUser } from "@/lib/api/react-query/queries";
import { UseAuthenticatedUser } from "@/lib/store/store";
import { TAuthenticatedUser } from "@/lib/types/user";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { data: authenticatedUser } = useGetAuthenticatedUser(
    undefined,
    getToken,
    user?.externalId
  ) as { data: TAuthenticatedUser };
  console.log(authenticatedUser)
  const { setauthenticatedUser } = UseAuthenticatedUser();

  useEffect(() => {
    setauthenticatedUser(authenticatedUser);
  }, [authenticatedUser]);
  return <>{children}</>;
};

export default AuthProvider;
