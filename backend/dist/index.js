"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const Vote_1 = require("./entities/Vote");
const createUserLoader_1 = require("./utils/createUserLoader");
const createVoteLoader_1 = require("./utils/createVoteLoader");
const Product_1 = require("./entities/Product");
const product_1 = require("./resolvers/product");
const Order_1 = require("./entities/Order");
const OrderDetail_1 = require("./entities/OrderDetail");
const order_1 = require("./resolvers/order");
const stripe_1 = __importDefault(require("stripe"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Post_1.Post, User_1.User, Vote_1.Vote, Product_1.Product, Order_1.Order, OrderDetail_1.OrderDetail]
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET, {
        apiVersion: '2020-08-27',
    });
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [post_1.PostResolver, user_1.UserResolver, product_1.ProductResolver, order_1.OrderResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis, userLoader: createUserLoader_1.createUserLoader(), voteLoader: createVoteLoader_1.createVoteLoader() })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.use(express_1.default.json());
    app.post("/stripe/charge", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("stripe-routes.js 9 | route reached", req.body);
        let { amount, id } = req.body;
        console.log("stripe-routes.js 10 | amount and id", amount, id);
        try {
            const payment = yield stripe.paymentIntents.create({
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
        }
        catch (error) {
            console.log("stripe-routes.js 17 | error", error);
            res.json({
                message: "Payment Failed",
                success: false,
            });
        }
    }));
    app.listen(parseInt(process.env.PORT), () => {
        console.log("server started on localhost: 4000");
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map