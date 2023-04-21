import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserCreate, UserFindByUsername } from "../types.ts";

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({
    user_id,
    username,
    password,
  }: UserCreate): Promise<User> {
    let user: User;

    if(user_id) {
      user = await this.userRepository.findOneBy({ user_id });
      if(user) throw new Error("С выбранным ИД уже существует");
    }

    user = new User();
    user.user_id = user_id;
    user.username = username;
    user.password = password;

    return user.save();
  }

  async findByUsername({
    username,
  }: UserFindByUsername): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }
}