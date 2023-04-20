import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRepository } from './repository/book.repository';
import { GenreModule } from '../genre/genre.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
    ]),
    GenreModule,
    AuthorModule,
  ],
  controllers: [BookController],
  providers: [
    BookService,
    BookRepository,
  ]
})
export class BookModule {}
