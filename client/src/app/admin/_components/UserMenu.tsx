"use client";
import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api/requests";
import UserMenuSkeleton from "./UserMenuSkeleton";
import useOnClickOutside from "@/hooks/use-outside-click";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const { data: response, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  const handleDropDownClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  if (isLoading) return <UserMenuSkeleton isOpen={isOpen} />;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropDownClick}
        className="flex items-center space-x-3 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">
            {response?.data.user?.fullName || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">
            {response?.data.user?.email || "No email"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default UserMenu;
