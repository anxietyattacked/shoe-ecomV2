import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderDetail } from "./OrderDetail";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  price!: number

  @Field()
  @Column()
  image!: string

  @Field()
  @Column()
  imageHeight!: number

  @Field()
  @Column()
  imageWidth!: number

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product) 
  orderDetails: OrderDetail[]; 

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

 
}