import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { AuthorCreate } from "../types";

export class CreateAuthorDto extends AuthorCreate {
  @ApiProperty({
    type: String,
    required: false,
    example: "640a6dd5-57f5-4506-98b8-1f90f1d76219",
  })
  author_id: string;

  @ApiProperty({
    type: String,
    example: "А. Автор"
  })
  name: string;

  @ApiProperty({
    type: Date,
    example: "2023-04-20T04:38:51.704Z",
  })
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;
}
