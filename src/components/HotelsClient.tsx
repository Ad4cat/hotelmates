"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SearchFilters from "./SearchFilters";
import HotelCard from "./HotelCard";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  country: string;
  min_price: number;
  rating: number;
  img_url: string;
  // 必要なフィールドを追加
}

interface Props {
  initialHotels: Hotel[];
}

interface FilterOptions {
  search?: string;
  priceRange?: [number, number];
  ratingRange?: [number, number];
  sortBy?: "price-LtH" | "price-HtL" | "rating";
}

export default function HotelsClient({ initialHotels }: Props) {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(initialHotels);

  const handleFilterChange = (filters: FilterOptions) => {
    let result = [...initialHotels];

    if (filters.search) {
      result = result.filter(
        (hotel) =>
          hotel.name
            .toLowerCase()
            .includes(filters.search?.toLowerCase() ?? "") ||
          hotel.location
            .toLowerCase()
            .includes(filters.search?.toLowerCase() ?? "")
      );
    }

    if (filters.priceRange) {
      result = result.filter(
        (hotel) =>
          hotel.min_price >= (filters.priceRange?.[0] ?? 0) &&
          hotel.min_price <= (filters.priceRange?.[1] ?? Infinity)
      );
    }

    if (filters.ratingRange) {
      result = result.filter(
        (hotel) =>
          hotel.rating >= (filters.ratingRange?.[0] ?? 0) &&
          hotel.rating <= (filters.ratingRange?.[1] ?? Infinity)
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-LtH":
          result.sort((a, b) => a.min_price - b.min_price);
          break;
        case "price-HtL":
          result.sort((a, b) => b.min_price - a.min_price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    setFilteredHotels(result);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
      duration: 1,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto px-3"
    >
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 m-10 mt-0">
        <div className="md:col-span-1">
          <div className="flex justify-center">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
        </div>
        {/* Hotels */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.5 }}
                key={hotel.id}
              >
                <HotelCard key={hotel.id} hotel={hotel} />
              </motion.div>
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No hotels found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
