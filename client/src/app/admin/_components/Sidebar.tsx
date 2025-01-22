import React from "react";
import { cn } from "@/utils/tw-merge";
import Logo from "@/components/ui/logo";
import MenuItems from "./MenuItems";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
  className,
  ...props
}: SidebarProps) => {
  return (
    <aside
      className={cn(
        "h-full overflow-hidden",
        isOpen ? "w-64" : "w-0",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="px-6 py-6">
          <Logo />
          <nav className="mt-6">
            <MenuItems />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
