import React from 'react'

const QuoteDetails = ({params}:{params:{podcastId:string}}) => {
  return (
   <p className='text-white-1'>PodcastDetails for {params.podcastId}</p>
  )
}

export default QuoteDetails