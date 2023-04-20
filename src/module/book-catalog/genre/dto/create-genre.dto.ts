import { ApiProperty } from "@nestjs/swagger";
import { GenreCreate } from "../types";

export class CreateGenreDto extends GenreCreate {
  @ApiProperty({
    type: String,
    required: false,
    example: "640a6dd5-57f5-4506-98b8-1f90f1d76219",
  })
  genre_id: string;

  @ApiProperty({
    type: String,
    example: "Детектив"
  })
  name: string;
}
