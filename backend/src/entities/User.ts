
import { Field, ObjectType } from "type-graphql";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Order } from "./Order";
import {Comment} from "./Comment"
 

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  


  @Field()
  @Column({unique: true})
  username!: string

  @Field()
  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Post, post => post.creator)
  posts: Post[]

  @OneToMany(() =>  Comment, comment => comment.creator)
  comments: Comment[]

  @OneToMany(() => Order, order => order.user)
  orders: Order[]

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[]

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
 
}