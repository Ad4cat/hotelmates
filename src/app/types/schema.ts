export interface Review {
  id: string;
  hotelId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  tags: string[];
}
