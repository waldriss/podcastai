import { GetToken } from "@/lib/types";
import { GenerateAudioParams } from "@/lib/types/podcast";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const generateAudio = async ({
  input,
  voice,
}: GenerateAudioParams,getToken:GetToken): Promise<any> => {
  try {
    let voiceValue
    switch(voice){
      case "brian":voiceValue="nPczCjzI2devNBz1zQrb"
      case "bill":voiceValue="pqHfZKP75CvOlQylNhV4"
      case "george":voiceValue="JBFqnCBsd6RMkjVDRZzb"
      case "lilly":voiceValue="pFZP5JQG7iQjIQuC4Bku"
    }
    const token=await getToken();
    const res = await fetch(`${backendUrl}generate-audio`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ voice:voiceValue, input }),
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



export const generateImage = async ({
prompt
}: {prompt:string},getToken:GetToken): Promise<any> => {
  try {
    const token=await getToken();
    const res = await fetch(`${backendUrl}generate-image`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({prompt }),
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(error.message);
    }
    const blob = await res.blob();
    console.log(blob);
    return blob;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
