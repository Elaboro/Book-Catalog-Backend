import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../../book/entities/book.entity";

@Entity({ name: "genre" })
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  genre_id: string;

  @Column({
    type: "text",
  })
  name: string;

  @ManyToMany(() => Book, (book) => book.genre_list)
  book_list: Book[]
}
