"use client"
import { UseAuthenticatedUser } from '@/lib/store/store'
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'
import Header from './Header';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const RightSidebar = () => {
  const { signOut } = useClerk();
  const audio={audioUrl:true}
  const {authenticatedUser}=UseAuthenticatedUser()
  const logout=async()=>{
    await signOut()
  }
  const showuser=()=>{
    console.log(authenticatedUser)
  }
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
        <Header headerTitle="Fans Like You" />
        {//<Carousel fansLikeDetail={topPodcasters!}/>
        }
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcastrs" />
        <div className="flex flex-col gap-6">
          {/*topPodcasters?.slice(0, 3).map((podcaster) => (
            <div key={podcaster._id} className="flex cursor-pointer justify-between" onClick={() => router.push(`/profile/${podcaster.clerkId}`)}>
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">{podcaster.name}</h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">{podcaster.totalPodcasts} podcasts</p>
              </div> 
            </div>
          ))*/}
        </div>
      </section>
    </section>
  )
}

export default RightSidebar
