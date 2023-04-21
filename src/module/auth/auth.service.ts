import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import bcrypt from 'bcrypt';
import { UserRepository } from './repository/user.repository';
import { AuthJwtService } from './auth-jwt.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async register({
    username,
    password,
  }: RegisterUserDto) {
    const password_hash = bcrypt.hashSync(password, 10);

    const user = await this.userRepository.create({
      username,
      password: password_hash,
    });

    return this.authJwtService.generateToken(user);
  }

  async login({
    username,
    password,
  }: LoginUserDto) {
    const user = await this.userRepository.findByUsername({ username });

    if(!user) {
      throw new Error("Неверный пользователь или пароль");
    }

    const is_password_equals = bcrypt.compareSync(
      password,
      user.password,
    );

    if(!is_password_equals) {
      throw new Error("Неверный пользователь или пароль");
    }

    return this.authJwtService.generateToken(user);
  }
}
