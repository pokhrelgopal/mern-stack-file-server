import React from "react";
import Link from "next/link";
import { Logout } from "iconsax-react";
import { motion } from "framer-motion";
import { dropDownMenuItems } from "@/constants/menu";
import { useRouter } from "next/navigation";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { logout } from "@/lib/api/requests";

const UserDropdown = () => {
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
    <motion.div
      className="absolute rounded top-full right-0 mt-2 w-40 bg-white border border-gray-100 shadow-sm z-10 p-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <ul>
        {dropDownMenuItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          >
            <Link href={item.url}>
              <span className="px-3 py-1.5 text-sm text-gray-700 flex items-center space-x-2 rounded">
                <item.icon className="size-4 stroke-current" />
                <span>{item.label}</span>
              </span>
            </Link>
          </motion.li>
        ))}
        <motion.li
          onClick={handleLogout}
          className="cursor-pointer"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        >
          <span className="px-3 py-1.5 text-sm text-gray-700 flex items-center space-x-2 rounded">
            <Logout className="size-4 stroke-current" />
            <span>Logout</span>
          </span>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default UserDropdown;
