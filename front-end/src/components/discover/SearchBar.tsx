import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const SearchBar = ({search,setSearch}:{search:string,setSearch:React.Dispatch<React.SetStateAction<string>>}) => {
  
    const [searchInputValue,setSearchInputValue]=useState(search);
    const handleSearch=()=>{
        setSearch(searchInputValue);
    }
    return (
      <div className="relative mt-8 block">
        <Input 
          className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
          placeholder='Search for podcasts'
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <Image 
          src="/icons/search.svg"
          alt="search"
          height={20}
          width={20}
          className="absolute left-4 top-3.5"
        />
        <Button onClick={handleSearch} className='bg-orange-1 absolute top-0 py-6 px-8 text-white-1 right-0'>
            Search
        </Button>
      </div>
    )
  }

export default SearchBar