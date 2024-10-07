import React from 'react'
import RightSidebar from './RightSidebar'
import { auth } from '@clerk/nextjs/server'
import { TopAuthor } from '@/lib/types/user'
import { getServerTopAuthors } from '@/lib/api/requests/UsersRequests'

const RightSidebarProvider = async() => {
    const {getToken}=auth()
    const token=await getToken()
    let initialTopAuthors:TopAuthor[]|undefined
    if(token){
        initialTopAuthors=await getServerTopAuthors(token)
    }

  return (
    <RightSidebar initialTopAuthors={initialTopAuthors}/>
  )
}

export default RightSidebarProvider