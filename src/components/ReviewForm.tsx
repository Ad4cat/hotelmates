"use client";

import React, { useState } from "react";
import ScoreStars from "./ScoreStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [currency, setCurrency] = useState("¥");
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 max-w-2xl pb-12"
      >
        <Link
          href={"/"}
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center pt-5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </div>
        </Link>
        <Card className="border border-accent">
          <CardHeader>
            <CardTitle className="text-2xl">Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="items-center">
              <form className="space-y-12">
                {/* ホテル詳細 */}
                <div>
                  <label
                    htmlFor="hotelName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Hotel Name
                  </label>
                  <Input
                    id="hotelName"
                    type="text"
                    placeholder="e.g. The Grand Kyoto Hotel"
                    className="border px-3 py-2 rounded w-full"
                  />

                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-700 mt-4 block"
                  >
                    Country
                  </label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="e.g. Japan"
                    className="border px-3 py-2 rounded w-full"
                  />

                  <label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700 mt-4 block"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g. Kyoto"
                    className="border px-3 py-2 rounded w-full"
                  />
                  <label
                    htmlFor="access"
                    className="text-sm font-medium text-gray-700 mt-4 block"
                  >
                    How did you get to the hotel?
                  </label>
                  <Input
                    id="access"
                    type="text"
                    placeholder="e.g. 10 min walk from Kyoto Station"
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                {/* 総合評価 */}
                <div id="ev">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium ">Rating</label>
                    <ScoreStars value={rating} onChange={setRating} />
                  </div>
                </div>
                {/* 宿泊日程 */}
                <div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="checkin"
                        className="text-gray-700 text-sm font-medium"
                      >
                        Check-in:
                      </label>
                      <Input id="checkin" type="date" className="w-fit" />
                    </div>
                    <div className="flex items-center gap-2 space-x-1">
                      <label
                        htmlFor="nights"
                        className="text-gray-700 text-sm font-medium"
                      >
                        Nights:
                      </label>
                      <Input
                        id="nights"
                        type="number"
                        min={1}
                        className="w-20"
                        placeholder="1"
                      />
                      <span>泊</span>
                    </div>
                    <div>
                      <div className="flex items-start space-x-2">
                        <label
                          htmlFor="price"
                          className="text-gray-700 text-sm font-medium"
                        >
                          Price:
                        </label>
                        <div className="flex flex-col space-y-3 pt-1">
                          {/* 通貨セレクト */}
                          <RadioGroup
                            defaultValue={currency}
                            className="flex gap-6"
                            onValueChange={setCurrency}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="$" id="usd" />
                              <Label htmlFor="usd">$ USD</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="¥" id="jpy" />
                              <Label htmlFor="jpy">¥ JPY</Label>
                            </div>
                          </RadioGroup>

                          {/* 金額 */}
                          <div className="flex items-center space-x-2">
                            <Input
                              id="price"
                              type="number"
                              min={0}
                              className="w-auto"
                              placeholder="10000"
                            />
                            <span>/ 泊</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Positive, Negative */}
                <div>
                  <label
                    htmlFor="positive"
                    className="text-sm font-medium text-gray-700"
                  >
                    What did you like?
                  </label>
                  <Textarea
                    id="positive"
                    placeholder="e.g. The view from the room was amazing."
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />

                  <label
                    htmlFor="negative"
                    className="text-sm font-medium text-gray-700 mt-4 block"
                  >
                    What didn’t you like?
                  </label>
                  <Textarea
                    id="negative"
                    placeholder="e.g. The hotel is far from the station."
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />
                </div>
                {/* 写真 */}
                <div>
                  <label htmlFor="inputfile">
                    Got any photos? Add one here.
                  </label>
                  <Input
                    id="inputfile"
                    type="file"
                    className="hover:cursor-pointer  "
                  />
                </div>
                {/* Name */}
                <div>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name ( If left blank, your name will default to
                      <span className="font-bold">{`'anonymous'`}</span>. )
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="bg-background border-accent"
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
          <CardHeader>
            {/* 送信 */}
            <div>
              <Button
                variant="default"
                className="hover:cursor-pointer hover:scale-110"
              >
                Submit Review
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReviewForm;
