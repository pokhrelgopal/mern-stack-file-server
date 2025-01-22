"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/requests/user.requests";

export default function LoginForm({
  setShowOtpForm,
}: {
  setShowOtpForm: (value: boolean) => void;
}) {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data, "data");
      if (!data?.success) {
        showToast(data?.message || "Something went wrong !", "error");
      }
      if (data?.success) {
        router.push("/admin/dashboard");
      }
    },
    onError: (error) => {
      console.error(error.message);
      showToast(error.message || "Something went wrong !", "error");
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="w-sm">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-8">Log In to Admin Panel</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
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
          <label htmlFor="password" className="block text-sm font-medium">
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
        <Button
          size={"lg"}
          className="w-full text-white"
          type="submit"
          loading={isLoading}
          loadingText="Signing in..."
        >
          Sign In
        </Button>
        <p className="text-center text-sm text-gray-500">
          Forget your password?{" "}
          <Link
            href="/admin/forgot-password"
            className="text-[#4F46E5] hover:underline"
          >
            Reset it here
          </Link>
        </p>
      </form>
    </div>
  );
}
