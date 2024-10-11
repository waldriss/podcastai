import { GetToken } from "@/lib/types";
import { AuthorDetails, TopAuthor } from "@/lib/types/user";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTopAuthors = async (
  getToken: GetToken
): Promise<TopAuthor[] | []> => {
  try {
    const token = await getToken();

    const topAuthorsResponse = await fetch(`${backendUrl}top-authors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!topAuthorsResponse.ok) {
      return [];
    }
    const topAuthorsData: { topAuthors: TopAuthor[] } =
      await topAuthorsResponse.json();

    return topAuthorsData?.topAuthors ? topAuthorsData.topAuthors : [];
  } catch (error) {
    throw error;
  }
};

export const getServerTopAuthors = async (
  token: string
): Promise<TopAuthor[] | []> => {
  try {
    const topAuthorsResponse = await fetch(`${backendUrl}top-authors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!topAuthorsResponse.ok) {
      return [];
    }
    const topAuthorsData: { topAuthors: TopAuthor[] } =
      await topAuthorsResponse.json();

    return topAuthorsData?.topAuthors ? topAuthorsData.topAuthors : [];
  } catch (error) {
    throw error;
  }
};

export const getAuthor = async (
  id: string,
  getToken: GetToken
): Promise<AuthorDetails> => {
  try {
    const token = await getToken();

    const authorResponse = await fetch(`${backendUrl}authors/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!authorResponse.ok) {
      throw new Error("Author not found");
    }
    const authorData: { author: AuthorDetails } = await authorResponse.json();

    return authorData.author;
  } catch (error) {
    throw error;
  }
};

export const getServerAuthor = async (
  id: string,
  token: string
): Promise<AuthorDetails> => {
  try {
    const authorResponse = await fetch(`${backendUrl}authors/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!authorResponse.ok) {
      throw new Error("Author not found");
    }
    const authorData: { author: AuthorDetails } = await authorResponse.json();

    return authorData.author;
  } catch (error) {
    throw error;
  }
};
