import SignInForm from '@/app/components/signInForm'
import { Link } from '@nextui-org/react'
import React from 'react'

function SignIn() {
  return (
    <div>
        <SignInForm/>
      <div className='mx-auto justify-center text-center '>
        <Link href='/auth/ForgotPassword'>Forgot your password?</Link>
      </div>
    </div>
  )
}

export default SignIn
