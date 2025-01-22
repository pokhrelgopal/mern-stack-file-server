"use client";

import React from "react";
import UpdateProfile from "./_components/UpdateProfile";
import DeleteProfile from "./_components/DeleteProfile";

export default function Settings() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <article className=" space-y-5">
        <UpdateProfile />
        <DeleteProfile />
      </article>
    </>
  );
}
