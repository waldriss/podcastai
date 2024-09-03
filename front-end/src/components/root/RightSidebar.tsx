"use client"
import { UseAuthenticatedUser } from '@/lib/store/store'
import { useClerk } from '@clerk/nextjs';
import React from 'react'

const RightSidebar = () => {
  const { signOut } = useClerk();

  const {authenticatedUser}=UseAuthenticatedUser()
  const logout=async()=>{
    await signOut()
  }
  return (
    <section className='right_sidebar text-white-1'>
        {authenticatedUser?authenticatedUser.name:'not authenticated'}
        <button onClick={logout}></button>
    </section>
  )
}

export default RightSidebar
