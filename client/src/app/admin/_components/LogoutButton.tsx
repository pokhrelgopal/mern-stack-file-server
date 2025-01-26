"use client";
import { Logout } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { logout } from "@/lib/api/requests";
const LogoutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"] as InvalidateQueryFilters);
      router.push("/admin/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="p-6">
      <p
        onClick={handleLogout}
        className="flex p-1.5 text-sm items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded"
      >
        <Logout className="w-5 h-5 mr-3 stroke-gray-900" />
        <span>Logout</span>
      </p>
    </div>
  );
};

export default LogoutButton;
