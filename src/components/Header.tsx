"use client";

import React from "react";
import { PencilLine } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import UserStatus from "./UserStatus";
import Image from "next/image";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.div
      // initial={{ y: -100 }}
      // animate={{ y: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", delay: 0.5, stiffness: 50 }}
      className="sticky top-0 z-50 flex justify-between p-2 px-10 items-center gap-2 font-extrabold backdrop-blur-xs"
    >
      <Link href="/">
        <div className="relative items-center w-18 h-9 mt-1 md:mt-3 rounded-2xl hover:shadow-md px-5">
          <Image
            alt="la"
            src="/logo.svg"
            fill
            className="object-contain"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
      </Link>

      <div className="flex items-center space-x-1 md:space-x-4 ">
        <Link href={`/new`} className="rounded-2xl ">
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center cursor-pointer rounded-2xl hover:shadow-md"
          >
            <PencilLine />
            Write a Review
          </Button>
        </Link>
        <UserStatus />
      </div>
    </motion.div>
  );
};
