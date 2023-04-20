import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repository/author.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
    ]),
  ],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    AuthorRepository,
  ],
  exports: [
    AuthorRepository,
  ],
})
export class AuthorModule {}
