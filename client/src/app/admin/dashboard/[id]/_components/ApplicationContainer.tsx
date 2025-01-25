"use client";
import { getApplication } from "@/lib/api/requests/app.requests";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  id: string;
};

const ApplicationContainer = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(id),
    enabled: !!id,
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <div>ApplicationContainer</div>;
};

export default ApplicationContainer;
