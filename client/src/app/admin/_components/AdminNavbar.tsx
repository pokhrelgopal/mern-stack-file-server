import { cn } from "@/utils/tw-merge";
import { Message, Notification } from "iconsax-react";
import React from "react";
import UserMenu from "./UserMenu";
type AdminNavbarProps = {
  className?: string;
};

const AdminNavbar = ({ className }: AdminNavbarProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
