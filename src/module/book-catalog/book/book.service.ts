import { Injectable } from '@nestjs/common';
import { removeFieldDeleted } from '../../../utils/common/cleaner';
import { AuthorRepository } from '../author/repository/author.repository';
import { GenreRepository } from '../genre/repository/genre.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BookService {

  constructor(
    private readonly bookRepository: BookRepository,
    private readonly genreRepository: GenreRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async create({
    book_id,
    title,
    date_publication,
    editorial,
    genre_list,
    author_list,
  }: CreateBookDto) {
    const [
      genre_list_entity,
      author_list_entity,
    ] = await Promise.all([
      this.genreRepository.findByIds(genre_list),
      this.authorRepository.findByIds(author_list),
    ]);

    const book = await this.bookRepository.create({
      book_id,
      title,
      date_publication,
      editorial,
      genre_list: genre_list_entity,
      author_list: author_list_entity,
    });

    const result = {
      ...removeFieldDeleted(book),
      author_list: removeFieldDeleted(book.author_list),
      genre_list: removeFieldDeleted(book.genre_list),
    };
    return result;
  }

  async findAll() {
    const list = await this.bookRepository.findList();
    return removeFieldDeleted(list);
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async update(id: number, {
    book_id,
    title,
    date_publication,
    editorial,
    genre_list,
    author_list,
  }: UpdateBookDto) {
    const [
      genre_list_entity,
      author_list_entity,
    ] = await Promise.all([
      this.genreRepository.findByIds(genre_list),
      this.authorRepository.findByIds(author_list),
    ]);

    const book = await this.bookRepository.update({
      book_id,
      title,
      date_publication,
      editorial,
      genre_list: genre_list_entity,
      author_list: author_list_entity,
    });

    const result = {
      ...removeFieldDeleted(book),
      author_list: removeFieldDeleted(book.author_list),
      genre_list: removeFieldDeleted(book.genre_list),
    };
    return result;
  }

  remove(book_id: string) {
    return this.bookRepository.delete({
      book_id,
    });
  }
}
