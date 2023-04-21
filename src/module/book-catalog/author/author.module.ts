import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repository/author.repository';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
    ]),
    AuthModule,
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
