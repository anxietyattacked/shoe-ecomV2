import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../entities/Product";

@InputType()
class ProductInput {
    @Field()
    name: string

    @Field()
    price: number

    @Field()
    image: string
}


@Resolver(Product)
export class ProductResolver {
@Query(() => Product)
product(
    @Arg("id", () => Int) id : number
){
    return Product.findOne(id)
}

@Query(() => [Product])
products(

): Promise<Product[]>{
    return Product.find()
}


@Mutation(() => Product)
async createProduct(
    @Arg("name") name: string,
    @Arg("price", () => Int) price: number,
    @Arg("image") image: string
): Promise<Product>{
    return await Product.create({name, image, price}).save()
}
@Mutation(() => Boolean)
async deleteProduct(
    @Arg("id", () => Int) id: number
): Promise<boolean>{
    const product = await Product.findOne(id)
    if(!product){
        return false
    }
 await Product.delete({id})
 return true
}
}