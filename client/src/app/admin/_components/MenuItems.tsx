"use client";
import React from "react";
import { menuItems } from "@/constants/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = () => {
  const pathname = usePathname();
  const activeClass = "bg-gray-200 text-gray-800";

  return (
    <nav>
      {menuItems.map((category, index) => (
        <div key={index} className="mb-2">
          <h2 className="text-gray-600 uppercase text-sm font-semibold">
            {category.category}
          </h2>
          <ul className="">
            {category.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className={`hover:bg-gray-200 rounded p-1.5 ${
                  pathname.includes(item.href) ? activeClass : "text-gray-800"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-sm transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-3 stroke-gray-900" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default MenuItems;
