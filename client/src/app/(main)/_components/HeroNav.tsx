"use client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { me } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroNav = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
  });
  return (
    <nav className="max-w-6xl h-16 mx-auto flex justify-between items-center px-4 py-6">
      <h4 className="text-h4 text-red-600">
        <Logo />
      </h4>

      {isLoading ? (
        <>
          <Skeleton className="w-20 h-9" />
        </>
      ) : (
        <>
          {data?.data.user ? (
            <Link href="/admin/dashboard">
              <Button size={"lg"} variant={"secondary"}>
                Dashboard
                <ArrowUpRight className="inline-block size-5" strokeWidth={1} />
              </Button>
            </Link>
          ) : (
            <Link href="/admin/login">
              <Button size={"lg"} variant={"secondary"}>
                Sign In
              </Button>
            </Link>
          )}
        </>
      )}
    </nav>
  );
};

export default HeroNav;
