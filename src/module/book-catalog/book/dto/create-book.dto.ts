import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBookDto {
  @ApiProperty({
    type: String,
    required: false,
    example: "640a6dd5-57f5-4506-98b8-1f90f1d76219",
  })
  book_id: string;

  @ApiProperty({
    type: String,
    example: "Наименование книги"
  })
  title: string;

  @ApiProperty({
    type: Date,
    example: "2023-04-20T04:38:51.704Z",
  })
  @Type(() => Date)
  date_publication: Date;

  @ApiProperty({
    type: String,
    example: "Наименование редакции"
  })
  editorial: string;

  @ApiProperty({
    type: Array,
    items: {
      type: "string",
    },
    example: [
      "eea1f993-88f0-4e2e-8e1a-ca586e8af02c",
      "4b1c210c-ff37-47fd-8e02-c3bcdc3e2350",
    ]
  })
  genre_list: string[];

  @ApiProperty({
    type: Array,
    items: {
      type: "string",
    },
    example: [
      "eea1f993-88f0-4e2e-8e1a-ca586e8af02c",
      "4b1c210c-ff37-47fd-8e02-c3bcdc3e2350",
    ]
  })
  author_list: string[];
}
