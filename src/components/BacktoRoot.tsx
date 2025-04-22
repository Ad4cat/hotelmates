import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BacktoRoot = () => {
  return (
    <div>
      <Link
        href={"/"}
        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Hotel
      </Link>
    </div>
  );
};

export default BacktoRoot;
