import { Header } from "@/components/Header";
import React from "react";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function HotelPage({ params }: Props) {
  const { name } = await params;
  return (
    <div>
      <Header />
      <p>THIS IS A EACH HOTELS PAGE</p>
      <h1>{name}</h1>
    </div>
  );
}
