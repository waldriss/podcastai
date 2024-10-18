import { LoaderCircle, LoaderIcon } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <LoaderCircle className="animate-spin text-orange-1" size={30} />
    </div>
  )
}

export default Loader