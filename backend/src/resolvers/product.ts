import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
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

@ObjectType()
class ProductPages {
    @Field(() => [Product])
    products: Product[]
    @Field(() => Int)
    pages: number
}

@Resolver(Product)
export class ProductResolver {
@Query(() => Product)
product(
    @Arg("id", () => Int) id : number
){
    return Product.findOne(id)
}

@Query(() => ProductPages)
async products(
@Arg("limit", () => Int) limit : number,
@Arg("offset", () => Int) offset : number
): Promise<ProductPages>{
    const [products, totalCount] = await Product.findAndCount({
        take: limit,
        skip: offset
    })
    const pages = Math.ceil(totalCount / limit)

    return {products: products, pages: pages }
}

@Query(() => ProductPages)
async searchProducts(
@Arg("search") search : string,
@Arg("limit", () => Int) limit : number,
@Arg("offset", () => Int) offset : number
): Promise<ProductPages>{
    // const [products, totalCount] = await Product.findAndCount({
    //     where:  `"name" ILIKE '${search}'`, 
    //     take: limit,
    //     skip: offset
    // })


    const [products, totalCount] = await getConnection()
    .createQueryBuilder()
    .select("product")
    .from(Product, "product")
    .where('name ILIKE :searchTerm', {searchTerm: `%${search}%`})
    .take(limit)
    .skip(offset)
    .getManyAndCount();
    const pages = Math.ceil(totalCount / limit)

    return {products: products, pages: pages }
}

@Mutation(() => Product)
async createProduct(
    @Arg("name") name: string,
    @Arg("price", () => Int) price: number,
    @Arg("image") image: string,
    @Arg("imageHeight", () => Int) imageHeight: number,
    @Arg("imageWidth", () => Int) imageWidth: number
): Promise<Product>{
    return await Product.create({name, image, price, imageHeight, imageWidth}).save()
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