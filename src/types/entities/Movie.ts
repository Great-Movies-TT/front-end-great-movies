export interface Movie {
  id: number;
  title: string;
  description: string;
  actors: string[];
  genre: string;
  rating: number;
  releaseDate: Date;
  imageUrl: URL;
}
