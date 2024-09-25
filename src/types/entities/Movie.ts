export interface Movie {
  id: number;
  title: string;
  description: string;
  actors: string[];
  genre: string;
  rating: number;
  releaseDate: string;
  imageUrl: string;
}

export interface AddMovie {
  title: string;
  description: string;
  actors: string[];
  genre: string;
  rating: number;
  releaseDate: string;
  imageUrl: string; 
}
