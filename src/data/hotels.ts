interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    location: "New York City, USA",
    description:
      "Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.",
    price: 12000,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    ],
  },
  {
    id: "2",
    name: "Seaside Resort & Spa",
    location: "Miami Beach, USA",
    description:
      "Beachfront resort offering pristine views and exceptional service.",
    price: 8800,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    ],
  },
  {
    id: "3",
    name: "Mountain Lodge",
    location: "Aspen, USA",
    description: "Cozy mountain retreat perfect for winter sports enthusiasts.",
    price: 44000,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1517320964276-a002fa203177?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    ],
  },
];
