import React from "react";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/AdminNavbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <Sidebar className="h-screen fixed w-64 bg-white border-r border-gray-200" />
      <article className="ml-64 grow">
        {/* <AdminNavbar className="py-5 px-10 shadow-sm border-b border-gray-200" /> */}
        <div className="p-8 bg-gray-50 min-h-screen">{children}</div>
      </article>
    </main>
  );
};

export default ProtectedLayout;
