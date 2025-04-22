import { Header } from "@/components/Header";
import React from "react";

type Params = Promise<{ [key: string]: string }>;
type Props = {
  params: Params;
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
