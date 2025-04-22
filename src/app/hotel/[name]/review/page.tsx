"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ReviewPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Here you would typically send this to your API
    const reviewData = {
      hotelId: params.name,
      userName: formData.get("name"),
      rating: rating,
      comment: formData.get("comment"),
      date: new Date().toISOString(),
      tags: [],
    };

    console.log("Review submitted:", reviewData);
    router.push(`/hotel/${params.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-2xl"
    >
      <Link
        href={`/hotel/${params.name}`}
        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Hotel
      </Link>

      <Card className="border border-accent">
        <CardHeader>
          <CardTitle className="text-2xl">Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <Input
                name="name"
                required
                placeholder="Enter your name"
                className="bg-background border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Review</label>
              <Textarea
                name="comment"
                required
                placeholder="Share your experience..."
                className="min-h-[150px] bg-background border-accent"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-accent hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!rating}
                className="bg-primary hover:bg-primary/90"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
