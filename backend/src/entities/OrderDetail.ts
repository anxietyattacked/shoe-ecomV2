import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class OrderDetail extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  productId: number

  @Field()
  @PrimaryColumn()
  orderId: number

  @Field(() => Order)
  @ManyToOne(() => Order, order => order.orderDetails, {cascade: true})
  order!: Order

  
  @Field(()=> Product)
  @ManyToOne(() => Product, product => product.orderDetails)
  product!: Product

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  price!: number

  @Field()
  @Column()
  qty!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

 
}