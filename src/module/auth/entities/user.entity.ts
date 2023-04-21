import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
  })
  password: string;

}