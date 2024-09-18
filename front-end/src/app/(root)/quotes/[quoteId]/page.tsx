import React from 'react'

const QuoteDetails = ({params}:{params:{quoteId:string}}) => {
  return (
   <p className='text-white-1'>quoteDetails for {params.quoteId}</p>
  )
}

export default QuoteDetails