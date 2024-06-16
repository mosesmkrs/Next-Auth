"use client";
import { forgotPassword } from "@/lib/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset password link was sent to your email.");
      reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div >
      <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
                <form onSubmit={handleSubmit(submitRequest)} className="space-y-4">
                    <div className="text-lg mb-2">Enter Your Email</div>
                    <Input
                        label="Email"
                        {...register("email")}
                        errorMessage={errors.email?.message}
                        isInvalid={!!errors.email}
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                    <Button
                        isLoading={isSubmitting}
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        className="w-full"
                    >
                        {isSubmitting ? "Please Wait..." : "Submit"}
                    </Button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ForgotPasswordPage;