import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column("float")
  price!: number;

  @Column("int")
  quantity!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "RESTRICT",
  })
  category!: Category;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
