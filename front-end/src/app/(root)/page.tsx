"use client"

import QuoteCard from '@/components/root/QuoteCard'
import { Button } from '@/components/ui/button'
import { quoteData } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Quotes</h1>
        <div className="quote_grid">
          {quoteData?.map(({ id, title,description,imgURL }) => (
            <QuoteCard 
              key={id}
              imgUrl={imgURL as string}
              title={title}
              description={description}
              quoteId={id}
            />
          ))}
        </div>
      
      </section>
     

    </div>
  )
}

export default page