import { Review } from "../app/types/schema";

export const reviews: Review[] = [
  {
    id: "1",
    hotelId: "1",
    userName: "John Smith",
    rating: 5,
    comment:
      "Exceptional service and stunning views. The staff went above and beyond to make our stay memorable.",
    date: "2024-03-15",
    tags: ["Service", "View", "Luxury"],
  },
  {
    id: "2",
    hotelId: "1",
    userName: "Emma Wilson",
    rating: 4.5,
    comment:
      "Beautiful hotel with great amenities. The spa was particularly impressive.",
    date: "2024-03-10",
    tags: ["Spa", "Amenities"],
  },
  {
    id: "3",
    hotelId: "2",
    userName: "Michael Brown",
    rating: 5,
    comment: "Perfect beach location with amazing facilities for families.",
    date: "2024-03-12",
    tags: ["Beach", "Family", "Location"],
  },
];
