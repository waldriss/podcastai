import { GetToken } from "@/lib/types";
import {
  CreateQuoteParams,
  DiscoverQuote,
  GenerateAudioParams,
  Quote,
  SimilarVoiceQuote,
  TrendingQuote,
  Voice,
} from "@/lib/types/quote";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const generateAudio = async (
  { input, voice }: GenerateAudioParams,
  getToken: GetToken
): Promise<any> => {
  try {
    let voiceValue;

    switch (voice) {
      case "Brian":
        voiceValue = "nPczCjzI2devNBz1zQrb";
        break;
      case "Bill":
        voiceValue = "pqHfZKP75CvOlQylNhV4";
        break;
      case "George":
        voiceValue = "JBFqnCBsd6RMkjVDRZzb";
        break;
      case "Lilly":
        voiceValue = "pFZP5JQG7iQjIQuC4Bku";
        break;
    }

    const token = await getToken();
    const res = await fetch(`${backendUrl}generate-audio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ voice: voiceValue, input }),
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

export const generateImage = async (
  { prompt }: { prompt: string },
  getToken: GetToken
): Promise<any> => {
  try {
    const token = await getToken();
    const res = await fetch(`${backendUrl}generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
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

export const createQuote = async (
  createQuoteParams: CreateQuoteParams,
  getToken: GetToken
) => {
  try {
    const token = await getToken();
    const audioBlob = await fetch(createQuoteParams.audioUrl).then((res) =>
      res.blob()
    );
    const imageBlob = await fetch(createQuoteParams.imageUrl).then((res) =>
      res.blob()
    );
    const formData = new FormData();
    formData.append("audioFile", audioBlob, "audio.mp3"); // 'audioFile' is the key
    formData.append("imageFile", imageBlob, "image.png"); // 'imageFile' is the key
    formData.append("quoteTitle", createQuoteParams.quoteTitle);
    formData.append("quoteDescription", createQuoteParams.quoteDescription);
    formData.append("imagePrompt", createQuoteParams.imagePrompt);
    formData.append("voicePrompt", createQuoteParams.voicePrompt);
    formData.append("voiceType", createQuoteParams.voiceType);
    formData.append("views", createQuoteParams.views.toString());
    formData.append(
      "audioDuration",
      createQuoteParams.audioDuration.toString()
    );

    const res = await fetch(`${backendUrl}create-quote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(error.message);
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getTrendingQuotes = async (
  getToken: GetToken
): Promise<TrendingQuote[] | []> => {
  try {
    const token = await getToken();

    const quotesResponse = await fetch(`${backendUrl}trending-quotes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!quotesResponse.ok) {
      return [];
    }
    const quotesData: { quotes: TrendingQuote[] } = await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    throw error;
  }
};

export const getServerTrendingQuotes = async (
  token: string
): Promise<TrendingQuote[] | []> => {
  try {
    const quotesResponse = await fetch(`${backendUrl}trending-quotes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!quotesResponse.ok) {
      return [];
    }
    const quotesData: { quotes: TrendingQuote[] } = await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    throw error;
  }
};

export const getQuoteById = async (
  id: string,
  getToken: GetToken
): Promise<Quote> => {
  try {
    const token = await getToken();

    const quoteResponse = await fetch(`${backendUrl}quotes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!quoteResponse.ok) {
      throw new Error("Quote not found");
    }
    const quoteData: { quote: Quote } = await quoteResponse.json();
    return quoteData.quote;
  } catch (error) {
    throw error;
  }
};

export const getServerQuoteById = async (
  id: string,
  token: string
): Promise<Quote> => {
  try {
    const quoteResponse = await fetch(`${backendUrl}quotes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!quoteResponse.ok) {
      throw new Error("Quote not found");
    }
    const quoteData: { quote: Quote } = await quoteResponse.json();
    return quoteData.quote;
  } catch (error) {
    throw error;
  }
};

export const getQuotesByVoice = async (
  voice: Voice,
  getToken: GetToken
): Promise<SimilarVoiceQuote[] | []> => {
  try {
    const token = await getToken();

    const quotesResponse = await fetch(
      `${backendUrl}quotes-by-voice?voice=${voice}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!quotesResponse.ok) {
      return [];
    }
    const quotesData: { quotes: SimilarVoiceQuote[] } =
      await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    throw error;
  }
};

export const getServerQuotesByVoice = async (
  voice: Voice,
  token: string
): Promise<SimilarVoiceQuote[] | []> => {
  try {
    const quotesResponse = await fetch(
      `${backendUrl}quotes-by-voice?voice=${voice}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!quotesResponse.ok) {
      return [];
    }
    const quotesData: { quotes: SimilarVoiceQuote[] } =
      await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteQuote = async (id: number, getToken: GetToken) => {
  try {
    const token = await getToken();
    const response = await fetch(`${backendUrl}quote-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message); // Error message from the backend
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getQuotes = async (
  search: string,
  getToken: GetToken
): Promise<DiscoverQuote[] | []> => {
  try {
    const token = await getToken();

    const quotesResponse = await fetch(`${backendUrl}quotes?search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!quotesResponse.ok) {
      return [];
    }
    const quotesData: { quotes: DiscoverQuote[] } = await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    throw error;
  }
};

export const getServerQuotes = async (
  search: string,
  token: string
): Promise<DiscoverQuote[] | []> => {
  try {
   
    const quotesResponse = await fetch(`${backendUrl}quotes?search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!quotesResponse.ok) {
      return [];
    }
   
    const quotesData: { quotes: DiscoverQuote[] } = await quotesResponse.json();

    return quotesData?.quotes ? quotesData.quotes : [];
  } catch (error) {
    throw error;
  }
};
