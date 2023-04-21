import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Storage } from "../../../storage/entities/storage.entity";
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

  @OneToOne(() => Storage)
  @JoinColumn()
  file: Storage;
}
