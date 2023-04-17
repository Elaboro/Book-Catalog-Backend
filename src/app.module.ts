import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourcePostgres } from './config/datasource';
import { AuthModule } from './module/auth/auth.module';
import { AuthorModule } from './module/book-catalog/author/author.module';
import { BookModule } from './module/book-catalog/book/book.module';
import { GenreModule } from './module/book-catalog/genre/genre.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        autoLoadEntities: true
      }),
      dataSourceFactory: async () => dataSourcePostgres
    }),
    AuthModule,
    BookModule,
    AuthorModule,
    GenreModule,
  ],
})
export class AppModule {}
