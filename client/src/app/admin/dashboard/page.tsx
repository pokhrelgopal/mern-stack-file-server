"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import JobCard from "./_components/JobCard";

export default function Dashboard() {
  return (
    <article>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Applications</h1>
        <Link href="/admin/dashboard/create-application">
          <Button className="mt-4">
            <Plus size={16} />
            Create a new app
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6 my-5">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </article>
  );
}
