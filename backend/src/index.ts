import "reflect-metadata"
import "dotenv-safe/config"
import {COOKIE_NAME, __prod__} from "./constants"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import Redis from "ioredis"
import session from "express-session"
import connectRedis from "connect-redis"
import cors from "cors"
import {createConnection} from "typeorm"
import { Post } from "./entities/Post"
import { User } from "./entities/User"
import path from "path"
import { Vote } from "./entities/Vote"
import { createUserLoader } from "./utils/createUserLoader"
import { createVoteLoader } from "./utils/createVoteLoader"
import { Product } from "./entities/Product"
import { ProductResolver } from "./resolvers/product"
import { Order } from "./entities/Order"
import { OrderDetail } from "./entities/OrderDetail"
import { OrderResolver } from "./resolvers/order"
import Stripe from "stripe"
import { CommentResolver } from "./resolvers/comment"
import {Comment} from "./entities/Comment"


const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL, 
        logging: true,
        synchronize: false,
        migrations:[path.join(__dirname, "./migrations/*")],
        entities: [Post, User, Vote, Product, Order, OrderDetail, Comment],
        ssl: {
          rejectUnauthorized: false
        }
    })
    // await conn.runMigrations()
    // await OrderDetail.delete({})
    // await Order.delete({})

    // await Product.delete({})
    // await Vote.delete({})
    // await Post.delete({})
    // await User.delete({})
    conn
    const app = express()

    const RedisStore = connectRedis(session)
    const redis = new Redis(process.env.REDIS_URL)
    app.set("trust proxy", 1)
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }))
    const stripe = new Stripe(process.env.STRIPE_SECRET
    , {
        apiVersion: '2020-08-27',
      })
    
    app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({ 
            client: redis,
            disableTouch: true,

        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
            httpOnly: false,
            sameSite: "lax",
            secure: true,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
      })
    )
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[PostResolver, UserResolver, ProductResolver, OrderResolver, CommentResolver],
            validate: false,
        }), 
        context: ({req, res}) => ({req, res, redis, userLoader: createUserLoader(), voteLoader: createVoteLoader()}),
        introspection: true, //optional if you still want access to graphQL playground in production
        playground: true
    })


    apolloServer.applyMiddleware({ app, cors: false})
    app.use(express.json());
    app.post("/stripe/charge", async (req, res) => {
        console.log("stripe-routes.js 9 | route reached", req.body);
        let { amount, id } = req.body;
        console.log("stripe-routes.js 10 | amount and id", amount, id);
        try {
          const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "Your Company Description",
            payment_method: id,
            confirm: true,
          });
          console.log("stripe-routes.js 19 | payment", payment);
          res.json({
            message: "Payment Successful",
            success: true,
          });
        } catch (error) {
          console.log("stripe-routes.js 17 | error", error);
          res.json({
            message: "Payment Failed",
            success: false,
          });
        }
      });

    app.listen(parseInt(process.env.PORT) || 4000, () => {
        console.log(`server started on localhost: ${process.env.PORT}`)
    })

}
main().catch((err) => {
    console.log(err)
})