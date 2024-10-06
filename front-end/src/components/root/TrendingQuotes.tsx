"use client"
import { useGetTrendingQuotes } from '@/lib/api/react-query/queries'
import { TrendingQuote } from '@/lib/types/quote'
import { useAuth } from '@clerk/nextjs'
import React from 'react'
import QuoteCard from './QuoteCard'

const TrendingQuotes = ({initialTrendingQuotes}:{initialTrendingQuotes?:TrendingQuote[]}) => {
  const {getToken}=useAuth()
  const {data:trendingQuotes}=useGetTrendingQuotes(initialTrendingQuotes,getToken)
  return (
    <div className="quote_grid">
    {trendingQuotes?.map(({ id, title, description, imageUrl }) => (
      <QuoteCard
        key={id}
        imgUrl={imageUrl}
        title={title}
        description={description}
        quoteId={id}
      />
    ))}
  </div>
  )
}

export default TrendingQuotes