import { Order } from "../entities/Order";
import { OrderDetail } from "../entities/OrderDetail";
import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@InputType()
class OrderInput {
    @Field()
    shipName: string

    @Field()
    shipAddress: string

    @Field()
    city: string
  
    @Field()
    state: string
  
    @Field()
    zipcode: number
  
    @Field()
    country: string
}

@InputType()
class OrderDetailInput {
    @Field()
    productId: number
  
    @Field()
    name: string
  
    @Field()
    price: number
  
    @Field()
    qty: number
}
// @ObjectType()
// class Cart {
//     @Field()
//     : OrderDetailInput[]
    
// }

@ObjectType()
class orderFieldError {
    @Field()
    field: string
    @Field()
    message: string



}
@ObjectType()
class OrderResponse {
    @Field(() => [orderFieldError], {nullable: true})
    errors?: orderFieldError[]

    @Field(() => Order)
    order?: Order
}
@ObjectType()
class WholeOrderDetail {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    productId: number

    @Field(() => Int)
    UserId: number
  
    
    @Field()
    name: string

    @Field()
    price: number

    @Field()
    qty: number
}
@ObjectType()
class WholeOrder {
    @Field(() => Int)
    id: number

    @Field()
    total: number
  
    
    @Field()
    shipName: string
  
    @Field()
    shipAddress: string
  
    @Field()
    city: string
  
    @Field()
    state: string
  
    @Field()
    zipcode: number
  
    @Field()
    country: string

    @Field(() => [OrderDetail])
    orderDetails: WholeOrderDetail[]
}


@Resolver()
export class OrderResolver {
@Query(() => WholeOrder, {nullable: true})
async order(
@Arg("id", () => Int) id : number
): Promise<any>{
    const order  = await Order.findOne({id}, {relations:["orderDetails"]})
    if(!order){
        throw new Error("Order not found")
    }
    console.log(order)
    return order


}

@Query(() => [WholeOrder], {nullable: true})
async orders(

): Promise<any>{
    const orders = await Order.find({relations:["orderDetails"]})
    console.log(orders)
    return orders


}

@Mutation(() => OrderResponse)
async createOrder(
    @Arg("orderInput") orderInput : OrderInput,
    @Arg("cart", () => [OrderDetailInput]) cart : OrderDetailInput[],
    
): Promise<OrderResponse>{
    if(cart.length === 0){
        throw new Error("Cart is empty, cannot order.")
    }
    const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
 const order = await Order.create({
    total: cartTotal,
    shipName: orderInput.shipName,
    shipAddress: orderInput.shipAddress,
    city: orderInput.city,
    state: orderInput.state,
    country: orderInput.country,
    zipcode: orderInput.zipcode,
    }).save()
    
    cart.forEach(async item => await OrderDetail.create({orderId: order.id, productId: item.productId, name: item.name, price: item.price, qty: item.qty }).save())
    

    return{order}

} 


@Mutation(() => Order, {nullable: true})
async updateShipping(
    @Arg("id",() => Int) id: number,
    @Arg("input") input : OrderInput
): Promise<Order>{
    let order = await Order.findOne(id, {relations:["orderDetails"]})
    if(!order){
        throw new Error("Could not find order")
    }
    order.shipName = input.shipName
    order.shipAddress = input.shipAddress
    order.city = input.city
    order.state = input.state
    order.country = input.country
    order.zipcode = input.zipcode
    await Order.save(order)
    return order
    


}
@Mutation(() => OrderDetail, {nullable: true})
async updateCartQty(
    @Arg("id",() => Int) id: number,
    @Arg("qty", () => Int) qty : number
): Promise<OrderDetail>{
    let orderDetail = await OrderDetail.findOne({id})
    if(!orderDetail){
        throw new Error("Product not found")
    }
    
    orderDetail.qty = qty
    OrderDetail.save(orderDetail)
    // let order = Order.findOne({id:orderDetail.order})
    return orderDetail

    
    
    


}

@Mutation(() => Boolean)
async deleteOrderDetail(
    @Arg("id", () => Int) id : number,
): Promise<Boolean>{
    OrderDetail.delete({id})

    return true
}

@Mutation(() => Boolean)
async deleteOrder(
    @Arg("id", () => Int) id : number,
): Promise<Boolean>{
    OrderDetail.delete({orderId: id})
    Order.delete(id)

    return true
}
}