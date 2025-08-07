"use client";

import { Search, SlidersHorizontal, Star } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { motion } from "framer-motion";

interface FilterOptions {
  search?: string;
  priceRange?: [number, number];
  ratingRange?: [number, number];
  sortBy?: "price-LtH" | "price-HtL" | "rating";
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([3, 5.0]);
  const handlePriceSliderChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange({ priceRange: value });
  };
  const handleRatingSliderChange = (value: [number, number]) => {
    setRatingRange(value);
    onFilterChange({ ratingRange: value });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", delay: 0.5, stiffness: 50 }}
      className="space-y-6 p-6 bg-card rounded-xl border border-accent w-full"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Search</span>
        </div>
        <Input
          placeholder="Hotels Name..."
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full bg-background border-accent"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Sort & Filter</span>
        </div>
        <Select
          onValueChange={(value: "price-LtH" | "price-HtL" | "rating") =>
            onFilterChange({ sortBy: value })
          }
        >
          <SelectTrigger className="w-full bg-background border-accent">
            <SelectValue placeholder="Sort By..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-LtH">Price : Low to High</SelectItem>
            <SelectItem value="price-HtL">Price : High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Price Range</p>
          <Slider
            defaultValue={[0, 100000]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={handlePriceSliderChange}
          />
        </div>
        <div>
          <div className="flex justify-center items-centet">
            <div className="px-3 py-1 bg-accent rounded-md">
              <span className="text-sm font-medium">¥{priceRange[0]}</span>
            </div>
            <div className="flex-grow mx-4" />
            <div className="px-3 py-1 bg-accent rounded-md">
              <span className="text-sm font-medium">¥{priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Rating Range</p>
          <Slider
            defaultValue={[3, 5.0]}
            min={0}
            max={5}
            step={0.1}
            onValueChange={handleRatingSliderChange}
          />
        </div>
        <div>
          <div className="flex justify-center items-centet">
            <div className="px-3 py-1 bg-accent rounded-md">
              <span className="flex items-center text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                {ratingRange[0].toFixed(1)}
              </span>
            </div>
            <div className="flex-grow mx-4" />
            <div className="px-3 py-1 bg-accent rounded-md">
              <span className="flex items-center text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                {ratingRange[1].toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
