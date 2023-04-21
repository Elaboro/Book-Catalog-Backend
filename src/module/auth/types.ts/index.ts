import { User } from "../entities/user.entity";

interface IUserCreate {
  user_id?: Awaited<User["user_id"]>;
  username: Awaited<User["username"]>;
  password: Awaited<User["password"]>;
}

export class UserCreate implements IUserCreate {
  user_id?: string;
  username: string;
  password: string;
}

interface IUserFindByUsername {
  username: Awaited<User["username"]>;
}

export class UserFindByUsername implements IUserFindByUsername {
  username: string;
}

export class UserPayload {
  user_id: string;
  username: string;
}

export class AuthToken {
  token: string;
}