import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    example: "user",
    type: String,
  })
  readonly username: string;

  @ApiProperty({
    example: "user",
    type: String,
  })
  readonly password: string;
}
