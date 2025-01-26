"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "@/lib/api/requests/user.requests";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";

const RegisterPage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      router.push(
        `/admin/onboarding?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error) => {
      showToast(error.message || "Something went wrong!", "error");
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="w-sm max-w-md mx-auto">
      <div className="mb-5">
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <p className="text-sm text-gray-600">
          Get started by creating an account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              errorMessage={errors.fullName?.message}
              {...register("fullName")}
              icon={<User strokeWidth={1} size={20} />}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              errorMessage={errors.email?.message}
              {...register("email")}
              icon={<Mail strokeWidth={1} size={20} />}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              errorMessage={errors.password?.message}
              {...register("password")}
              icon={<Lock strokeWidth={1} size={20} />}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              icon={<Lock strokeWidth={1} size={20} />}
            />
          </div>
        </div>
        <Button
          size={"lg"}
          className="w-full text-white"
          type="submit"
          loading={isLoading}
          loadingText="Creating"
        >
          Create an Account
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-[#4F46E5] hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
