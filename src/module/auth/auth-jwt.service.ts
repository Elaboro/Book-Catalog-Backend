import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "./entities/user.entity";
import { AuthToken, UserPayload } from "./types.ts";

@Injectable()
export class AuthJwtService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateToken({
    user_id,
    username,
  }: User): AuthToken {
    const payload: UserPayload = {
      user_id,
      username,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  } 
}