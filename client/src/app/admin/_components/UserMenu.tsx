"use client";
import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api/requests";
import UserMenuSkeleton from "./UserMenuSkeleton";
import UserDropdown from "./UserDropdown";
import useOnClickOutside from "@/hooks/use-outside-click";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
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

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </motion.div>
      </button>
      <AnimatePresence>{isOpen && <UserDropdown />}</AnimatePresence>
    </div>
  );
};

export default UserMenu;
