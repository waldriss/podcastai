"use client"
import PodcastCard from '@/components/root/PodcastCard'
import { Button } from '@/components/ui/button'
import { podcastData } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
        <div className="podcast_grid">
          {podcastData?.map(({ id, title,description,imgURL }) => (
            <PodcastCard 
              key={id}
              imgUrl={imgURL as string}
              title={title}
              description={description}
              podcastId={id}
            />
          ))}
        </div>
      
      </section>
     

    </div>
  )
}

export default page