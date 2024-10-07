import { create } from "zustand";
import { TAuthenticatedUser } from "../types/user";
import { Audio } from "../types";

interface AuthenticatedUserContext {
  authenticatedUser: TAuthenticatedUser | undefined;
  setauthenticatedUser: (
    authenticatedUser: TAuthenticatedUser | undefined
  ) => void;
}

export const UseAuthenticatedUser = create<AuthenticatedUserContext>()(
  (set) => ({
    authenticatedUser: undefined,
    setauthenticatedUser: (authenticatedUser: TAuthenticatedUser | undefined) =>
      set({ authenticatedUser }),
  })
);

interface AudioContext {
  audio: Audio | undefined;
  setAudio: (audio: Audio | undefined) => void;
}

export const UseAudio = create<AudioContext>()((set) => ({
  audio: undefined,
  setAudio: (audio: Audio | undefined) => set({ audio }),
}));
