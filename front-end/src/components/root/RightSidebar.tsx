"use client";
import { UseAuthenticatedUser } from "@/lib/store/store";
import { useAuth, useClerk, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Header from "./Header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TopAuthor } from "@/lib/types/user";
import { useGetTopAuthors } from "@/lib/api/react-query/queries";
import { useRouter } from "next/navigation";
import Carousel from "./Carousel";
import { ExploreQuote } from "@/lib/types/quote";
import profileicon from "@icons/profile.svg";
import ProfileDropDown from "./ProfileDropDown";
interface ExploreQuotes_withName {
  quote: ExploreQuote;
  authorName: string;
}

const RightSidebar = ({
  initialTopAuthors,
}: {
  initialTopAuthors?: TopAuthor[];
}) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { data: topAuthors } = useGetTopAuthors(initialTopAuthors, getToken);
  let exploreQuotes_withName: ExploreQuotes_withName[] = [];
  if (topAuthors) {
    if (topAuthors.length < 3) {
      topAuthors.forEach((topAuthor) => {
        topAuthor.quotes.forEach((quote) => {
          exploreQuotes_withName = [
            ...exploreQuotes_withName,
            { quote: quote, authorName: topAuthor.name },
          ];
        });
      });
    } else {
      exploreQuotes_withName = topAuthors?.map((topAuthor) => ({
        quote: topAuthor.quotes[0],
        authorName: topAuthor.name,
      }));
    }
  }

  const { authenticatedUser } = UseAuthenticatedUser();

  return (
    <section
      className={cn("right_sidebar h-[calc(100vh-5px)]", {
        "h-[calc(100vh-140px)]": false,
      })}
    >
      {authenticatedUser && (
        <div className="flex gap-3 pb-12">
          <Link href={`/profile/${authenticatedUser.id}`}>
            <Image
              height={50}
              width={50}
              src={authenticatedUser?.imageUrl || profileicon}
              alt="profile_icon"
              className="rounded-full aspect-square object-cover"
            />
          </Link>

          <div className="flex w-full items-center justify-between">
            <Link href={`/profile/${authenticatedUser.id}`}>
              <h1 className="text-16 truncate font-semibold text-white-1">
                {authenticatedUser.name}
              </h1>
            </Link>

            <ProfileDropDown/>
          </div>
        </div>
      )}

      {exploreQuotes_withName.length > 0 && (
        <section>
          <Header headerTitle="ExploreQuotes" />
          <Carousel exploreQuotes_withName={exploreQuotes_withName} />
        </section>
      )}

      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Authors" />
        <div className="flex flex-col gap-6">
          {topAuthors?.map((author) => (
            <div
              key={author.id}
              className="flex cursor-pointer justify-between"
              onClick={() => router.push(`/profile/${author.id}`)}
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={author?.imageUrl || "./icons/profile.svg"}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="aspect-square rounded-full object-cover"
                />
                <h2 className="text-14 font-semibold text-white-1">
                  {author.name}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">
                  {author._count.quotes} quotes
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
