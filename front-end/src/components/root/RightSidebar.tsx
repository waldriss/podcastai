"use client"
import { UseAuthenticatedUser } from '@/lib/store/store'
import { useClerk, useUser } from '@clerk/nextjs';
import React from 'react'

const RightSidebar = () => {
  const { signOut } = useClerk();
  const {user}=useUser()

  const {authenticatedUser}=UseAuthenticatedUser()
  const logout=async()=>{
    await signOut()
  }
  const showuser=()=>{
    console.log(authenticatedUser)
  }
  return (
    <section className='right_sidebar text-white-1'>
        {authenticatedUser?authenticatedUser.name:'not authenticated'}
        <button onClick={showuser}> show user</button>
        <button onClick={logout}>logout</button>
    </section>
  )
}

export default RightSidebar
