import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthorModule } from "./book-catalog/author/author.module";
import { BookModule } from "./book-catalog/book/book.module";
import { GenreModule } from "./book-catalog/genre/genre.module";
import { CfgModule } from "./configuration/cfg.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    CfgModule,
    AuthModule,
    BookModule,
    AuthorModule,
    GenreModule,
    StorageModule,
  ],
})
export class RootModule {}