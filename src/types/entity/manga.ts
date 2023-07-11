export type Manga = {
  id: number;
  volume: number;
  jumlah_tersedia: number;
  harga_sewa: number;
  seri_id: number;
};

export type Penulis = {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  peran: string;
};

export type Genre = {
  id: number;
  nama: string;
};

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
