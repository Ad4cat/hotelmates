import { Header } from "@/components/Header";
import ReviewForm from "@/components/ReviewForm";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5">
      <Header />
      <ReviewForm />
    </div>
  );
}
