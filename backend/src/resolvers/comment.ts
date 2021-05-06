import { Comment } from "../entities/Comment";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";



@ObjectType()
class CommentsPages {
    @Field(() => [Comment])
    comments: Comment[]
    @Field(() => Int)
    pages: number
}



@Resolver()
export class CommentResolver {
@Query(() => Comment)
comment(
    @Arg("id", () => Int) id : number
){
    return Comment.findOne({where:{id}, relations:["creator"]})
}

@Query(() => CommentsPages)
async productComments(
@Arg("productId", () => Int) productId : number,
@Arg("limit", () => Int) limit : number,
@Arg("offset", () => Int) offset : number

):Promise<any>{
    const [comms, totalCount] = await Comment.findAndCount({where:{productId}, take: limit, skip: offset, order:{createdAt: "ASC"}, relations:["creator"]})
    // const test  = await Comment.find({where:{productId}, relations:["creator"]})

    
    return {comments: comms, page: totalCount}
}

@Mutation(() => Comment)
@UseMiddleware(isAuth)
async createComment(
    @Arg("productId", () => Int) productId : number,
    @Arg("text") text : string,
    @Ctx() {req} : MyContext
) :Promise<Comment>{
    if(!req.session.userId){
        throw new Error("Not Authenticated")
    }
    return Comment.create({
        productId,
        text,
        creatorId: req.session.userId,
    }).save()

}
@Mutation(() => Boolean)
async updateComment(
    @Arg("id", () => Int) id: number,
    @Arg("text") text: string,
): Promise<boolean>{
    const comment = await Comment.findOne(id)
    if(!comment){
        return false
    }

    await getConnection()
 .createQueryBuilder()
 .update(Comment)
 .set({ text: text})
 .where("id = :id", { id: id })
 .execute()
return true 
}

@Mutation(() => Boolean)
async deleteComment(
    @Arg("id", () => Int) id: number
): Promise<boolean>{
    const comment = await Comment.findOne(id)
    if(!comment){
        return false
    }
 await Comment.delete({id})
 return true
}

@Mutation(() => Boolean)
async deleteAllProductComments(
    @Arg("productId", () => Int) productId: number
): Promise<boolean>{
    const comment = await Comment.find({productId})
    if(!comment){
        return false
    }
 await Comment.delete({productId})
 return true
}
}