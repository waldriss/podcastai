import { GetToken } from "@/lib/types";
import { GenerateAudioParams } from "@/lib/types/podcast";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const generateAudio = async ({
  input,
  voice,
}: GenerateAudioParams,getToken:GetToken): Promise<ArrayBuffer> => {
  try {
    const token=await getToken();
    const res = await fetch(`${backendUrl}generate-audio`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ voice, input }),
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(error.message);
    }
    const arrayBuffer = await res.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
