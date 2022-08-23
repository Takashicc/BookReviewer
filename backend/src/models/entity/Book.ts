import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 50 })
  author: string;

  @Column({ length: 50 })
  publisher: string;

  @Column({ length: 13 })
  isbn: string;

  @Column()
  releasedAt: Date;

  @Column()
  deleted: boolean;
}
