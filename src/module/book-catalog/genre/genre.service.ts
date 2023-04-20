import { Injectable } from '@nestjs/common';
import { removeFieldDeleted } from '../../../utils/common/cleaner';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './repository/genre.repository';

@Injectable()
export class GenreService {

  constructor(
    private readonly genreRepository: GenreRepository,
  ) {}

  async create({
    genre_id,
    name,
  }: CreateGenreDto) {
    const genre = await this.genreRepository.create({
      genre_id,
      name,
    });
    return removeFieldDeleted(genre);
  }

  async findAll() {
    const list = await this.genreRepository.findList();
    return removeFieldDeleted(list);
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  async update(id: number, {
    genre_id,
    name,
  }: UpdateGenreDto) {
    const genre = await this.genreRepository.update({
      genre_id,
      name,
    });

    return removeFieldDeleted(genre);
  }

  remove(genre_id: string) {
    return this.genreRepository.delete({
      genre_id,
    });
  }
}
