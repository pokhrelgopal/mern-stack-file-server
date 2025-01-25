"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "@/lib/api/requests/app.requests";
import { me } from "@/lib/api/requests";
import Spinner from "@/components/elements/spinner";
import { queryKeys } from "@/constants/query-keys";
import { Application } from "@/types/application.types";
import ApplicationCard from "./ApplicationCard";
import { Stack } from "@/components/ui/stack";

const DashboardPage = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: me,
    retry: 1,
    staleTime: 300000,
  });

  const {
    data: applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useQuery({
    queryKey: ["myApplications", userData?.data?.user?.id],
    queryFn: () => getMyApplications(userData?.data?.user?.id || ""),
    enabled: !!userData?.data?.user?.id,
    retry: 1,
    staleTime: 300000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  if (userLoading || applicationsLoading) {
    return (
      <article className="w-full">
        <Spinner />
      </article>
    );
  }

  if (userError || applicationsError) {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-red-500">
          {userError
            ? "Failed to load user data"
            : "Failed to load applications"}
        </p>
      </div>
    );
  }

  return (
    <article className="w-full p-4">
      <Stack className="mb-4" justify="between">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Link href="/admin/dashboard/create-application">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Application
          </Button>
        </Link>
      </Stack>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(applications?.data?.application) &&
          applications?.data?.application.map((app: Application) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
      </div>
    </article>
  );
};

export default DashboardPage;
