"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
//import NextAuthProviders from "./NextAuthProviders";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome To MKRS website!");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

    return (
        <div className=" flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1" htmlFor="email">Email</label>
                        <Input
                            {...register('email')}
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="password">Password</label>
                        <Input
                            {...register('password')}
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                   <div className="flex items-center justify-between gap-2">
                        <Button color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting} className="w-full">
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                        <Button as={Link} href="/auth/signup" className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm
