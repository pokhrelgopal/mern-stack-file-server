"use client";

import { Badge } from "@/components/ui/badge";
import UpdateProfileSheet from "./UpdateProfileSheet";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { UserResponse } from "@/types";

interface UpdateProfileProps {
  data?: UserResponse;
  isLoading: boolean;
}

const UpdateProfile = ({ data, isLoading }: UpdateProfileProps) => {
  return (
    <div className="bg-white p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">Profile</h3>
        {!isLoading ? (
          <div className="flex gap-3">
            <p className="text-sm">{data?.data.user.fullName}</p>
            <Badge className="text-xs" variant="success">
              {data?.data.user.email}
            </Badge>
          </div>
        ) : (
          <div className="flex gap-3 py-1">
            <Skeleton className="w-24 h-4 bg-gray-100" />
            <Skeleton className="w-44 h-4 bg-gray-100" />
          </div>
        )}
      </div>
      <UpdateProfileSheet user={data?.data.user} />
    </div>
  );
};

export default UpdateProfile;
