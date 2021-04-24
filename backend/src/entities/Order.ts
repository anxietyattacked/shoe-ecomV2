import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { User } from "./User";

@ObjectType()
@Entity()
export class Order extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => User, user => user.orders)
  user: User[]

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[]

  @Field()
  @Column()
  total!: number

  
  @Field()
  @Column()
  shipName!: string

  @Field()
  @Column()
  shipAddress!: string

  @Field()
  @Column()
  city!: string

  @Field()
  @Column()
  state!: string

  @Field()
  @Column()
  zipcode!: number

  @Field()
  @Column()
  country!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

 
}