"use client"
import React from "react";
import ProfileCard from "./ProfileCard";
import { AuthorDetails } from "@/lib/types/user";
import { useGetAuthor } from "@/lib/api/react-query/queries";
import { useAuth } from "@clerk/nextjs";
import EmptyState from "../quotes/quote/EmptyState";
import QuoteCard from "../root/QuoteCard";

const ProfileInfos = ({
  initialAuthor,
  authorId,
}: {
  initialAuthor: AuthorDetails;
  authorId: string;
}) => {
  const { getToken } = useAuth();
  const { data: author } = useGetAuthor(initialAuthor, getToken, authorId);

  return (
    <section className="mt-2 flex flex-col">
     
      <div className="mt-2 flex flex-col gap-6 max-md:items-center md:flex-row">
        {author && (
          <ProfileCard
            imageUrl={author?.imageUrl}
            name={author.name}
            quotes={author.quotes}
            quotesNumber={author._count.quotes}
          />
        )}
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Quotes</h1>
        {author?.quotes&&author?.quotes.length > 0 ? (
          <div className="quote_grid">
            {author.quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                imgUrl={quote.imageUrl}
                title={quote.title}
                description={quote.description}
                quoteId={quote.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="no quotes yet" />
        )}
      </section>
    </section>
  );
};

export default ProfileInfos;
