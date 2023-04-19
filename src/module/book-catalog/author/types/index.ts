import { Author } from "../entities/author.entity";

interface IAuthorCreate {
  author_id: Awaited<Author["author_id"]>;
  name: Awaited<Author["name"]>;
  date_of_birth: Awaited<Author["date_of_birth"]>;
}

export class AuthorCreate implements IAuthorCreate {
  author_id: string;
  name: string;
  date_of_birth: Date;
}

interface IAuthorUpdate {
  author_id: Awaited<Author["author_id"]>;
  name: Awaited<Author["name"]>;
  date_of_birth: Awaited<Author["date_of_birth"]>;
}

export class AuthorUpdate implements IAuthorUpdate {
  author_id: string;
  name: string;
  date_of_birth: Date;
}

interface IAuthorDelete {
  author_id: Awaited<Author["author_id"]>;
}

export class AuthorDelete implements IAuthorDelete {
  author_id: string;
}
