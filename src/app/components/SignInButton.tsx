"use client"

import { Button, Link } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function SignInButton() {

  const {data: session} = useSession();
  return (
    <div >
      {session && session.user ? (
        <div className='flex items-center'>
        <Link href='/Profile' className='gap-2 mx-2 text-white'>{session.user.firstname}</Link>
        <Button className='gap-2' color="primary" onClick={()=>signOut()}>SignOut</Button> 
        </div>
      ):(
        <div className='flex items-center'>
        <Button onClick={() => signIn()} className='gap-2 mx-2' color="primary">SignIn</Button>
        <Link href="/auth/signup" >
        <Button color="primary">SignUp</Button>
        </Link>
        
        </div>
      )}
    </div>
  )
}

export default SignInButton
