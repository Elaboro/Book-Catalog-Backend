import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entities/book.entity";
import { BookCreate, BookDelete, BookUpdate } from "../types";

@Injectable()
export class BookRepository {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create({
    book_id,
    title,
    date_publication,
    editorial,
    genre_list,
    author_list,
  }: BookCreate): Promise<Book> {
    let book: Book;

    if(book_id) {
      book = await this.bookRepository.findOneBy({ book_id });
      if(book) throw new Error("C выбранным ИД уже существует");
    }

    book = new Book();
    book.book_id = book_id;
    book.title = title;
    book.date_publication = date_publication;
    book.editorial = editorial;
    book.genre_list = genre_list;
    book.author_list = author_list;
    
    return book.save();
  }

  async update({
    book_id,
    title,
    date_publication,
    editorial,
    genre_list,
    author_list,
  }: BookUpdate): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ book_id });

    if(!book) {
      throw new Error("Книга не найдена");
    }

    book.title = title;
    book.date_publication = date_publication;
    book.editorial = editorial;
    book.genre_list = genre_list;
    book.author_list = author_list;

    return book.save();
  }

  async findList(): Promise<Book[]> {
    const qb = this.bookRepository.createQueryBuilder("t");
    qb.where("t.deleted IS NULL");

    return qb.getMany();
  }

  async delete({
    book_id,
  }: BookDelete): Promise<void> {
    const book = await this.bookRepository.findOneBy({ book_id });

    if(!book || !!book?.deleted) {
      throw new Error("Книга не найдена");
    }

    book.deleted = new Date();
    book.save();
  }
}