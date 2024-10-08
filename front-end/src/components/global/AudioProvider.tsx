"use client";

import { UseAudio } from "@/lib/store/store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { audio, setAudio } = UseAudio();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/create-quote") setAudio(undefined);
  }, [pathname]);

  return <>{children}</>;
};

export default AudioProvider;
