import { Link } from '@nextui-org/react'
import React from 'react'
import SignUpForm from '../../components/signUpForm'

function signup() {
  return (
    <div>
        <SignUpForm/>
      <div className='mx-auto justify-center text-center '>
        <p>Already have an account?</p>
        <Link href='/auth/signin'>SignIn</Link>
      </div>
    </div>
  )
}

export default signup
