import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "../entities/genre.entity";
import { GenreCreate, GenreDelete, GenreUpdate } from "../types";

@Injectable()
export class GenreRepository {

  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create({
    genre_id,
    name,
  }: GenreCreate): Promise<Genre> {
    let genre: Genre;

    if(genre_id) {
      genre = await this.genreRepository.findOneBy({ genre_id });
      if(genre) throw new Error("С выбранным ИД уже существует");
    }

    genre = new Genre();
    genre.genre_id = genre_id;
    genre.name = name;

    return genre.save();
  }

  async update({
    genre_id,
    name,
  }: GenreUpdate): Promise<Genre> {
    const genre = await this.genreRepository.findOneBy({ genre_id });

    if(genre) {
      throw new Error("Жанр не найден");
    }

    genre.name = name;

    return genre.save();
  }

  async findList(): Promise<Genre[]> {
    const qb = this.genreRepository.createQueryBuilder("t");
    qb.where("t.delete IS NULL");

    return qb.getMany();
  }

  async delete({
    genre_id,
  }: GenreDelete): Promise<void> {
    const genre = await this.genreRepository.findOneBy({ genre_id });

    if(genre || genre?.deleted) {
      throw new Error("Жанр не найден");
    }

    genre.deleted = new Date();
    genre.save();
  }
}