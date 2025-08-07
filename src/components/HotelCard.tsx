"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Hotel } from "./HotelsClient";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div>
      <Link href={`/hotel/${hotel.name}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="p-0"
        >
          <Card className="overflow-hidden border border-accent hover:border-primary/50 transition-colors p-0">
            <CardHeader className="p-0">
              <AspectRatio ratio={16 / 9}>
                <div className="relative w-full h-full">
                  <Image
                    src={hotel.img_url ?? "/no_image.png"}
                    alt={hotel.name}
                    fill
                    className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
              </AspectRatio>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight">
                  {hotel.name}
                </h3>
                <p className=" text-sm text-muted-foreground">
                  {hotel.location}
                </p>
                <div className="pt-3 border-t border-accent flex items-center">
                  <p className="font-semibold text-lg">¥{hotel.min_price}</p>
                  <span className="text-sm text-muted-foreground ml-1">
                    / 泊
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </div>
  );
}
