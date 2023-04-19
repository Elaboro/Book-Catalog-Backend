import { cp } from "fs";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "../../author/entities/author.entity";
import { Genre } from "../../genre/entities/genre.entity";

@Entity({ name: "book" })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  book_id: string;

  @Column({
    type: "text",
  })
  title: string;

  @Column({
    type: "timestamp",
  })
  date_publication: Date;

  @Column({
    type: "text",
  })
  editorial: string;

  @ManyToMany(() => Genre, (genre) => genre.book_list)
  @JoinTable()
  genre_list: Genre[];

  @ManyToMany(() => Author, (author) => author.book_list)
  @JoinTable()
  author_list: Author[];

  @Column({
    nullable: true,
  })
  deleted: Date;
}
