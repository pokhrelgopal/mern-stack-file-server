import { Icon, User, Setting, Setting2, Menu } from "iconsax-react";

export const menuItems: MenuItemType = [
  {
    category: "",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: Menu,
      },
    ],
  },

  {
    category: "",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Setting2,
      },
    ],
  },
];

export const dropDownMenuItems: DropDownMenuItemType = [
  {
    label: "Profile",
    icon: User,
    url: "/admin/profile",
  },
  {
    label: "Settings",
    icon: Setting,
    url: "/admin/settings",
  },
];

/**
 * Type definitions for the menu items ⬇️⬇️
 */

export type MenuItemType = {
  category: string;
  items: {
    title: string;
    href: string;
    icon: Icon;
  }[];
}[];

export type DropDownMenuItemType = {
  label: string;
  icon: Icon;
  url: string;
}[];
