"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";

const appSchema = z.object({
  applicationName: z
    .string()
    .min(3, "Application name must be at least 3 characters")
    .max(50, "Application name must not exceed 40 characters"),
});

type AppSchema = z.infer<typeof appSchema>;

export default function CreateApplications() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppSchema>({
    resolver: zodResolver(appSchema),
  });

  const onSubmit = (data: AppSchema) => {
    console.log("Form submitted successfully:", data);
  };

  return (
    <>
      <BackButton />
      <article className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create Application</h1>
        </div>
        <div className="grid w-full grid-cols-3 gap-6 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="applicationName" className="font-medium">
                Application Name
              </label>
              <Input
                id="applicationName"
                placeholder="Enter application name"
                {...register("applicationName")}
                errorMessage={errors.applicationName?.message}
              />
            </div>
            <Button size={"lg"} className="mt-4" type="submit">
              <Plus size={16} />
              Create app
            </Button>
          </form>
        </div>
      </article>
    </>
  );
}

function BackButton() {
  return (
    <Link href="/admin/dashboard">
      <Button size={"icon"} variant={"secondary"} className="mt-4 rounded-full">
        <ArrowLeft size={16} className="stroke-primary" />
      </Button>
    </Link>
  );
}
