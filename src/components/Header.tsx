import React from "react";
import { PencilLine } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex justify-between p-2 px-10 items-center font-bold cursor-pointer backdrop-blur-xs">
      <Link href={"/"}>
        <div className="items-center text-2xl transition-transform duration-200 transform hover:scale-110 ">
          Hotel Mates
        </div>
      </Link>

      <Link href={`/new`}>
        <Button
          variant="ghost"
          size="lg"
          className="items-center border border-y-zinc-100 transition-transform duration-200 transform hover:scale-110"
        >
          <PencilLine className="mr-1 h-4 w-4" />
          Write a Review
        </Button>
      </Link>
    </div>
  );
};
