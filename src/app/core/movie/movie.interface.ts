type Actors = {
  name: string;
  image: string;
};

export interface Movie {
  title: string;
  image: string;
  genre: string;
  pg: string;
  director: string;
  description: string;
  actors: string[];
  runTime: number;
  premiere: boolean;
}
export interface MovieDto extends Movie {
  id: string;
  descriptionExtra: {
    actors: Actors[];
  };
  rating: string;
  votesNumber: number;

  runTime: number;
}
