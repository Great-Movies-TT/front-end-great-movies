export interface Movie {
  _id: number;
  title: string;
  description: string;
  actors: string[];
  genre: string;
  director: string;
  rating: number;
  releaseDate: string;
  imageUrl: string;
}

export interface AddMovie extends Omit<Movie, "_id"> {}

export interface MovieSeachPayload {
  page: number;
  limit?: number;
  genre?: string;
  minRating?: number | null;
}
