"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUrlParams } from "@/hooks/use-params";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { type OtpFormData, OtpSchema } from "@/schemas/auth";
import { verifyUser } from "@/lib/api/requests";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import Link from "next/link";

const OnboardingPage = () => {
  const { getUrlParam } = useUrlParams();
  const email = getUrlParam("email");
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      showToast("Verification successful. Please Login", "success");
      router.push("/admin/login");
    },
    onError: (error) => {
      showToast(error.message || "Something went wrong!", "error");
    },
  });

  const onSubmit = async (data: OtpFormData) => {
    mutate(data);
  };

  return (
    <div className="w-sm max-w-md mx-auto">
      <div>
        <h2 className="text-3xl font-bold">Verify</h2>
        <p className="text-gray-500">
          We have sent an OTP to your email address. Please enter the OTP to
          verify your email address.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              className="pl-10"
              errorMessage={errors.otp?.message}
              {...register("otp")}
              icon={<Key strokeWidth={1} size={20} />}
            />
          </div>
        </div>

        <Button
          size={"lg"}
          className="w-full text-white"
          type="submit"
          loading={isLoading}
          loadingText="Verifying..."
        >
          Verify
        </Button>
        {/* <p className="text-center text-sm text-gray-500">
          Didn't receive the OTP?{" "}
          <Link
            href="#"
            className="text-[#4F46E5] hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Add resend OTP functionality here
              showToast("OTP resent to your email", "success");
            }}
          >
            Resend OTP
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default OnboardingPage;
