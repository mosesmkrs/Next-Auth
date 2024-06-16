"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./passStrength";

import { toast } from "react-toastify";
import { resetPassword } from "@/lib/actions/authActions";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(52, "Password must be less than 52 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const passwordValue = watch().password;

useEffect(() => {
  setPassStrength(passwordStrength(passwordValue).id);
}, [passwordValue, watch]);


  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };
  return (
     <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
                <form onSubmit={handleSubmit(resetPass)} className="space-y-4">
                    <div>
                         <PasswordStrength passwordStrength={passStrength} />
                        <Input
                            type="password"
                            label="Password"
                            {...register("password")}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                            id="password"
                            name="password"
                            required
                        />
                       
                    </div>
                    <div>
                        <Input
                            type="password"
                            label="Confirm Password"
                            {...register("confirmPassword")}
                            errorMessage={errors.confirmPassword?.message}
                            isInvalid={!!errors.confirmPassword}
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            isLoading={isSubmitting}
                            type="submit"
                            disabled={isSubmitting}
                            color="primary"
                            className="w-full"
                        >
                            {isSubmitting ? "Please Wait..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
  );
};

export default ResetPasswordForm;