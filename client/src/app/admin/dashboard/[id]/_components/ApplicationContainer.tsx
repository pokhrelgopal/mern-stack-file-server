"use client";
import Spinner from "@/components/elements/spinner";
import { Stack } from "@/components/ui/stack";
import { getApplication } from "@/lib/api/requests/app.requests";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TotalStorage from "./TotalStorage";
import TotalFiles from "./TotalFiles";
import KeyContainer from "./KeyContainer";
import DangerContainer from "./DangerContainer";
import FileTable from "./FileTable";
import { File } from "@/types/file.types";

type Props = {
  id: string;
};

const ApplicationContainer = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(id),
    enabled: !!id,
  });
  if (isLoading) return <Spinner />;
  console.log(data);
  return (
    <>
      <div className="mb-5">
        <h2 className="text-3xl font-bold">{data?.data.application.name}</h2>
        <p className="text-gray-500">
          View and manage storage for your application.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-4 h-full">
            <TotalStorage totalStorage={data?.data.application.totalFileSize} />
            <TotalFiles fileCount={data?.data.application.fileCount} />
          </div>
        </div>
        <div className="col-span-2 space-y-3">
          <KeyContainer apiKey={data?.data.application.apiKey} />
        </div>
      </div>
      <FileTable
        apiKey={data?.data.application.apiKey}
        data={data?.data.application.File as File[]}
      />
      <DangerContainer applicationId={id} />
    </>
  );
};

export default ApplicationContainer;
