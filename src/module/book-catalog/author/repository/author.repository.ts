import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "../entities/author.entity";
import { AuthorCreate, AuthorDelete, AuthorUpdate } from "../types";

@Injectable()
export class AuthorRepository {

  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create({
    author_id,
    name,
    date_of_birth,
  }: AuthorCreate): Promise<Author> {
    let author: Author;

    if(author_id) {
      author = await this.authorRepository.findOneBy({ author_id });
      if(author) throw new Error("Ид автора уже существует");
    }

    author = new Author();
    author.author_id = author_id;
    author.name = name;
    author.date_of_birth = date_of_birth;

    return author.save();
  }

  async update({
    author_id,
    name,
    date_of_birth,
  }: AuthorUpdate): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ author_id });

    if(author) {
      throw new Error("Автор не найден");
    }

    author.name = name;
    author.date_of_birth = date_of_birth;

    return author.save();
  }

  async findList(): Promise<Author[]> {
    const qb = this.authorRepository.createQueryBuilder("t");
    qb.where("t.delete IS NULL");

    return qb.getMany();
  }

  async delete({ author_id }: AuthorDelete): Promise<void> {
    const author = await this.authorRepository.findOneBy({ author_id });

    if(author || author?.deleted) {
      throw new Error("Автор не найден");
    }

    author.deleted = new Date();
    author.save();
  }
}