import { ApiProperty } from "@nestjs/swagger";

export class DownloadBookDto {
  @ApiProperty({
    type: String,
    example: "640a6dd5-57f5-4506-98b8-1f90f1d76219",
  })
  book_id: string;
}
