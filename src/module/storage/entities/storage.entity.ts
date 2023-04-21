import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage" })
export class Storage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  file_id: string;

  @Column({
    type: "text",
  })
  originalname: string;

  @Column({
    nullable: true,
  })
  deleted: Date;
}