"use client";

import React from "react";
import UpdateProfile from "./_components/UpdateProfile";
import DeleteProfile from "./_components/DeleteProfile";
import { me } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export default function Settings() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <article className="space-y-5">
        <UpdateProfile data={data} isLoading={isLoading} />
        <DeleteProfile />
      </article>
    </>
  );
}
