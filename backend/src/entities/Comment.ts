
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";



@ObjectType()
@Entity()
export class Comment extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;


  @Field()
  @Column()
  text!: string

  @Field()
  @Column()
  creatorId: number

  @Field()
  @Column()
  productId: number

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.comments)
  product: Product

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments)
  creator: User

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

 
}