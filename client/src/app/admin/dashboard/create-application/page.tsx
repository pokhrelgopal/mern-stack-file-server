"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import {
  CreateApplicationData,
  createApplicationSchema,
} from "@/schemas/application";
import {
  QueryClient,
  useMutation,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { createApplication } from "@/lib/api/requests/app.requests";
import { queryKeys } from "@/constants/query-keys";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateApplications() {
  const { showToast } = useToast();
  const queryClient = new QueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationData>({
    resolver: zodResolver(createApplicationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(
        queryKeys.myApplication as InvalidateQueryFilters
      );
      showToast("Application created successfully", "success");
      router.push("/admin/dashboard");
    },
    onError: (error) => {
      showToast(error.message || "Something went wrong !", "error");
    },
  });

  const onSubmit = (data: CreateApplicationData) => {
    mutate(data);
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
              <label htmlFor="name" className="font-medium">
                Application Name
              </label>
              <Input
                id="name"
                placeholder="Enter application name"
                {...register("name")}
                errorMessage={errors.name?.message}
              />
            </div>
            <Button
              loading={isPending}
              loadingText="Creating"
              size={"lg"}
              className="mt-4"
              type="submit"
            >
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
