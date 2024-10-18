"use client"
import { DiscoverQuote } from '@/lib/types/quote'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import QuoteCard from '../root/QuoteCard'
import { useGetQuotes } from '@/lib/api/react-query/queries'
import { useAuth } from '@clerk/nextjs'
import EmptyState from '../quotes/quote/EmptyState'
import { LoaderCircle } from 'lucide-react'


const DiscoverQuotes = ({initialDiscoverQuotes}:{initialDiscoverQuotes?:DiscoverQuote[]}) => {
const [search,setSearch]=useState("")
const {getToken}=useAuth()
const {data:discoverQuotes,isFetching}=useGetQuotes(initialDiscoverQuotes,getToken,search)

 return (
    <div className="flex flex-col gap-9">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
        Discover Trending Quotes
     
        </h1>
        {discoverQuotes&&!isFetching? (
          <>
            {discoverQuotes.length > 0 ? (
              <div className="quote_grid">
              {discoverQuotes?.map(({ id, title, description, imageUrl }) => (
                <QuoteCard 
                  key={id}
                  imgUrl={imageUrl!}
                  title={title}
                  description={description}
                  quoteId={id}
                />
              ))}
            </div>
            ) : <EmptyState title="No results found" />}
          </>
        ) :
        <div className='flex justify-center items-center pt-20'>
           <LoaderCircle className="animate-spin text-orange-1 text-center" size={30}  />
        </div> 
       }
      </div>
    </div>
  )
}

export default DiscoverQuotes