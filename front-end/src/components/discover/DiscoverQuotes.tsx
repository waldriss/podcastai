"use client"
import { DiscoverQuote } from '@/lib/types/quote'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import QuoteCard from '../root/QuoteCard'
import { useGetQuotes } from '@/lib/api/react-query/queries'
import { useAuth } from '@clerk/nextjs'
import EmptyState from '../quotes/quote/EmptyState'
import Loader from '../global/Loader'

const DiscoverQuotes = ({initialDiscoverQuotes}:{initialDiscoverQuotes?:DiscoverQuote[]}) => {
const [search,setSearch]=useState("")
const {getToken}=useAuth()
const {data:discoverQuotes}=useGetQuotes(initialDiscoverQuotes,getToken,search)

 return (
    <div className="flex flex-col gap-9">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? 'Discover Trending Quotes' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {discoverQuotes ? (
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
        ) : <Loader />}
      </div>
    </div>
  )
}

export default DiscoverQuotes