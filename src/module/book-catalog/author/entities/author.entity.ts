import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../../book/entities/book.entity";

@Entity({ name: "author" })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  author_id: string;

  @Column({
    type: "text",
  })
  name: string;

  @Column({
    type: "timestamp",
  })
  date_of_birth: Date;

  @ManyToMany(() => Book, (book) => book.author_list)
  book_list: Book[];
}
