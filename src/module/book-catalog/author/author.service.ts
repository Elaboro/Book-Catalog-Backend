import { Injectable } from '@nestjs/common';
import { removeFieldDeleted } from '../../../utils/common/cleaner';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repository/author.repository';

@Injectable()
export class AuthorService {

  constructor(
    private readonly authorRepository: AuthorRepository,
  ) {}

  async create({
    author_id,
    name,
    date_of_birth,
  }: CreateAuthorDto) {
    const author = await this.authorRepository.create({
      author_id,
      name,
      date_of_birth,
    });
    return removeFieldDeleted(author);
  }

  async findAll() {
    const list = await this.authorRepository.findList();
    return removeFieldDeleted(list);
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  async update(id: number, {
    author_id,
    name,
    date_of_birth,
  }: UpdateAuthorDto) {
    const author = await this.authorRepository.update({
      author_id,
      name,
      date_of_birth,
    });
    return removeFieldDeleted(author);
  }

  async remove(author_id: string) {
    return this.authorRepository.delete({
      author_id,
    })
  }
}
