import { Genre } from "../entities/genre.entity";

interface IGenreCreate {
  genre_id: Awaited<Genre["genre_id"]>;
  name: Awaited<Genre["name"]>;
}

export class GenreCreate implements IGenreCreate {
  genre_id: string;
  name: string;
}


interface IGenreUpdate {
  genre_id: Awaited<Genre["genre_id"]>;
  name: Awaited<Genre["name"]>;
}

export class GenreUpdate implements IGenreUpdate {
  genre_id: string;
  name: string;
}

interface IGenreDelete {
  genre_id: Awaited<Genre["genre_id"]>;
}

export class GenreDelete implements IGenreDelete {
  genre_id: string;
}
