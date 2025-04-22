"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import SearchFilters from "../components/SearchFilters";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";
import Loading from "@/components/Loading";
import { Header } from "@/components/Header";

interface FilterOptions {
  search?: string;
  priceRange?: [number, number];
  ratingRange?: [number, number];
  sortBy?: "price-LtH" | "price-HtL" | "rating";
}

export default function Home() {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 疑似ローディング 1秒後に非表示
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  const handleFilterChange = (filters: FilterOptions) => {
    let result = [...hotels];

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
          hotel.price >= (filters.priceRange?.[0] ?? 0) &&
          hotel.price <= (filters.priceRange?.[1] ?? Infinity)
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
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-HtL":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    setFilteredHotels(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto "
    >
      <Header />
      <div className="flex items-center justify-center gap-3 mb-8 px-4 py-8">
        {/* <Building2 className="w-8 h-8 text-primary" /> */}
        <h1 className="text-center font-mono leading-tight  whitespace-pre-line">
          {/* スマホ用（2行） */}
          <span className="block text-2xl sm:hidden">
            <Typewriter
              words={["Save your stays.\nShare your stories."]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>

          {/* PC用（1行） */}
          <span className="hidden text-3xl sm:inline">
            <Typewriter
              words={["Save your stays. Share your stories."]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex justify-center">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
        </div>
        {/* Hotels */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
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
