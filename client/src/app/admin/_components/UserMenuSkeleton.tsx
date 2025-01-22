import React from "react";

export default function UserMenuSkeleton({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative animate-pulse">
      <div className="flex items-center space-x-3 cursor-pointer">
        <div>
          <div className="h-4 w-24 bg-gray-100 rounded-md"></div>{" "}
          {/* Placeholder for name */}
          <div className="h-3 w-32 bg-gray-100 rounded-md mt-1"></div>{" "}
          {/* Placeholder for email */}
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-100"></div>{" "}
        {/* Placeholder for avatar */}
        <div className="h-4 w-4 bg-gray-100 rounded-md"></div>{" "}
        {/* Placeholder for dropdown icon */}
      </div>
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-md rounded-md w-48 p-4">
          <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-100 rounded-md mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-100 rounded-md"></div>
        </div>
      )}
    </div>
  );
}
