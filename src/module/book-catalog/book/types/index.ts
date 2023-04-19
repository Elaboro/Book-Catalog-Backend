import { Author } from "../../author/entities/author.entity";
import { Genre } from "../../genre/entities/genre.entity";
import { Book } from "../entities/book.entity";

interface IBookCreate {
  book_id: Awaited<Book["book_id"]>;
  title: Awaited<Book["title"]>;
  date_publication: Awaited<Book["date_publication"]>;
  editorial: Awaited<Book["editorial"]>;
  genre_list: Awaited<Book["genre_list"]>;
  author_list: Awaited<Book["author_list"]>;
}

export class BookCreate implements IBookCreate {
  book_id: string;
  title: string;
  date_publication: Date;
  editorial: string;
  genre_list: Genre[];
  author_list: Author[];
}

interface IBookUpdate {
  book_id: Awaited<Book["book_id"]>;
  title: Awaited<Book["title"]>;
  date_publication: Awaited<Book["date_publication"]>;
  editorial: Awaited<Book["editorial"]>;
  genre_list: Awaited<Book["genre_list"]>;
  author_list: Awaited<Book["author_list"]>;
}

export class BookUpdate implements IBookUpdate {
  book_id: string;
  title: string;
  date_publication: Date;
  editorial: string;
  genre_list: Genre[];
  author_list: Author[];
}

interface IBookDelete {
  book_id: Awaited<Book["book_id"]>;
}

export class BookDelete implements IBookDelete {
  book_id: string;
}
