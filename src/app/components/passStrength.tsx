import { cn } from 'clsx-tailwind-merge';
import React from 'react'

interface Props {
    passwordStrength: number;
}

function PassStrength({passwordStrength}:Props) {
  return (
    <div className='flex gap-2  items-center'>
      
        <div  className={cn('w-3 h-3 rounded-full', {
                        "bg-red-500": passwordStrength === 0,
                        "bg-orange-500": passwordStrength === 1,
                        "bg-yellow-500": passwordStrength === 2,
                        "bg-green-500": passwordStrength === 3,
                    })}>
                   
                    </div>
   

         {passwordStrength===0 && <p>Too Weak</p>}
                    {passwordStrength===1 && <p>Weak</p>}
                    {passwordStrength===2 && <p>Medium</p>}
                    {passwordStrength===3 && <p>Strong</p>}
      
    </div>
   
  )
}

export default PassStrength
