import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenreRepository } from './repository/genre.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Genre,
    ]),
  ],
  controllers: [GenreController],
  providers: [
    GenreService,
    GenreRepository,
  ],
  exports: [
    GenreRepository,
  ],
})
export class GenreModule {}
