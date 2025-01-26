"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "iconsax-react";
import HeroNav from "./HeroNav";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
      },
    },
  };

  return (
    <article className="min-h-screen relative my-auto overflow-x-hidden">
      <HeroNav />
      <motion.main
        className="container mx-auto px-4 pt-40 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-7xl font-bold text-green-700 mb-6 flex flex-col"
          variants={itemVariants}
        >
          <span>Easy and better file uploads for</span>
          <span className="pt-2 text-red-600">Web Developers</span>
        </motion.h1>
        <motion.p
          className="text-gray-700 text-xl mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Upload your files with ease, share them with your friends, and manage
          them with a few clicks.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link href="/admin/register">
            <Button size={"lg"} className="rounded-full">
              <span>Get Started</span>
              <ArrowRight className="size-4 stroke-white" />
            </Button>
          </Link>
        </motion.div>
      </motion.main>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        variants={dotsVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-6 gap-2">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-white rounded-full opacity-50"
            ></div>
          ))}
        </div>
      </motion.div>
      <div className="absolute w-[400px] h-[400px] bg-green-100 rounded-full bottom-40 -right-20 blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-green-100 rounded-full -bottom-20 right-20  blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-100 rounded-full -bottom-40 right-[40%]  blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-100 rounded-full -bottom-40 left-0  blur-[100px]" />
    </article>
  );
}
