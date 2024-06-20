"use client"
import { Checkbox, Link, Input, user, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import validator from 'validator'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { watch } from 'fs'
import { passwordStrength } from 'check-password-strength'
import PassStrength from './passStrength'
import { toast } from 'react-toastify'
import { registerUser } from '@/lib/actions/authActions'

const FormSchema = z.object({
    firstName: z
        .string()
        .min(2,'First Name must be at least two characters' )
        .max(45, 'First name must be less than 45 characters')
        .regex(new RegExp("^[a-zA-Z]+$"),"No special characters are allowed"),
    lastName: z
        .string()
        .min(1,  'Last Name must be at least one character' )
        .max(45, 'Last name must be less than 45 characters')
        .regex(new RegExp("^[a-zA-Z]+$"),"No special characters are allowed"),
    email: z
        .string()
        .email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must be less than 20 characters'),
    confirmPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must be less than 20 characters'),
    acceptTerms: z
        .literal(true, {
            errorMap: () => ({ 
                message: 'You must accept the terms and conditions' 
            }),
        }),
    phone: z
        .string()
        .refine((val) => validator.isMobilePhone(val), 'Please enter a valid phone number!'),
 
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

type InputType = z.infer<typeof FormSchema>

function SignUpForm() {
    const { register, handleSubmit,watch, reset, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

const saveUser: SubmitHandler<InputType> = async (data) => {
    const { acceptTerms, confirmPassword, ...userData } = data;
    const { firstName, lastName, email, password, phone } = userData;
    
    try {
        const result = await registerUser({ firstname: firstName, lastname: lastName, email, password, phone });
        toast.success("Registered Successfully");
    } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
    }
}



    const [passStrength, setpassStrength] = useState(0)

    useEffect(() => {

        setpassStrength(passwordStrength(watch().password).id)
    }, [watch().password])
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit(saveUser)} className="space-y-4">
                    <div>
                        <label className="block mb-1" htmlFor="firstName">First Name</label>
                        <Input
                           errorMessage = {errors.firstName?.message}
                           isInvalid={!!errors.firstName}
                            {...register('firstName')}
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="lastName">Last Name</label>
                        <Input
                         errorMessage = {errors.lastName?.message}
                           isInvalid={!!errors.lastName}
                            {...register('lastName')}
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="email">Email</label>
                        <Input
                         errorMessage = {errors.email?.message}
                           isInvalid={!!errors.email}
                            {...register('email')}
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="password">Password</label>
                        <PassStrength passwordStrength={passStrength}/>
                        <Input
                         errorMessage = {errors.password?.message}
                           isInvalid={!!errors.password}
                            {...register('password')}
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                   
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <Input
                         errorMessage = {errors.confirmPassword?.message}
                           isInvalid={!!errors.confirmPassword}
                            {...register('confirmPassword')}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="phone">Phone</label>
                        <Input
                         errorMessage = {errors.phone?.message}
                           isInvalid={!!errors.phone}
                            {...register('phone')}
                            type="text"
                            id="phone"
                            name="phone"
                            required
                        />
                    </div>
                    <Checkbox 
                           isInvalid={!!errors.acceptTerms}{...register('acceptTerms')}>
                        I accept The <Link href=''>Terms And Conditions</Link>
                    </Checkbox>
                    {errors.acceptTerms && <p className="text-red-800 text-sm">{errors.acceptTerms.message}</p>}
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting?"Signing Up...":"Sign Up"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm
