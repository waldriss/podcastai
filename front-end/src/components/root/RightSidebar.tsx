"use client"
import { UseAuthenticatedUser } from '@/lib/store/store'
import { useAuth, useClerk, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'
import Header from './Header';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TopAuthor } from '@/lib/types/user';
import { useGetTopAuthors } from '@/lib/api/react-query/queries';
import { useRouter } from 'next/navigation';

const RightSidebar = ({initialTopAuthors}:{initialTopAuthors?:TopAuthor[]}) => {
  const router=useRouter()
  const {getToken}=useAuth()
  const {data:topAuthors}=useGetTopAuthors(initialTopAuthors,getToken);
  const exploreQuotes=()=>topAuthors?.map((topAuthor)=>topAuthor.quotes[0]);
  const audio={audioUrl:true}
  const {authenticatedUser}=UseAuthenticatedUser()
 
  return (
    <section className={cn('right_sidebar h-[calc(100vh-5px)]', {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
    {  authenticatedUser&&
        <Link href={`/profile/${authenticatedUser.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">{authenticatedUser.name}</h1>
            <Image 
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>}
      
      <section>
        <Header headerTitle="ExploreQuotes" />
        {//<Carousel fansLikeDetail={topPodcasters!}/>
        }
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Authors" />
        <div className="flex flex-col gap-6">
          {topAuthors?.map((author) => (
            <div key={author.id} className="flex cursor-pointer justify-between" onClick={() => router.push(`/profile/${author.id}`)}>
              <figure className="flex items-center gap-2">
                <Image
                  src={author.imageUrl}
                  alt={author.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">{author.name}</h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">{author._count.quotes} podcasts</p>
              </div> 
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default RightSidebar
