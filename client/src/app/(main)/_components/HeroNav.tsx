"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HeroNav = () => {
  return (
    <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-6">
      <h4 className="text-h4 text-red-600">DropIT</h4>
      <Link href="/login">
        <Button variant={"secondary"}>Sign In</Button>
      </Link>
    </nav>
  );
};

export default HeroNav;
