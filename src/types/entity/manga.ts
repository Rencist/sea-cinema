export type Seri = {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
};

export type Comment = {
  seat: string;
};

export type Rent = {
  id: string;
  movie_id: number;
  user_name: string;
  movie_name: string;
  total_price: number;
  seat: Comment[];
};
