export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export interface Review {
  id: string;
  hotelId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  tags: string[];
}
