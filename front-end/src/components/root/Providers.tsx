"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ServerAuthProvider from "./ServerAuthProvider";
import AudioProvider from "../global/AudioProvider";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/auth-logo.svg",
          },
          variables: {
            colorBackground: "#15171c",
            colorPrimary: "",
            colorText: "white",
            colorInputBackground: "#1b1f29",
            colorInputText: "white",
          },
        }}
      >
        <AudioProvider>{children}</AudioProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default Providers;
