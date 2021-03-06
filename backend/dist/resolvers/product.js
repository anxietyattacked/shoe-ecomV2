"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
let ProductPages = class ProductPages {
};
__decorate([
    type_graphql_1.Field(() => [Product_1.Product]),
    __metadata("design:type", Array)
], ProductPages.prototype, "products", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductPages.prototype, "pages", void 0);
ProductPages = __decorate([
    type_graphql_1.ObjectType()
], ProductPages);
let ProductResolver = class ProductResolver {
    product(id) {
        const product = Product_1.Product.findOne(id);
        console.log(product);
        return product;
    }
    products(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const [products, totalCount] = yield Product_1.Product.findAndCount({
                take: limit,
                skip: offset
            });
            const pages = Math.ceil(totalCount / limit);
            return { products: products, pages: pages };
        });
    }
    searchProducts(search, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const [products, totalCount] = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select("product")
                .from(Product_1.Product, "product")
                .where('name ILIKE :searchTerm', { searchTerm: `%${search}%` })
                .take(limit)
                .skip(offset)
                .getManyAndCount();
            const pages = Math.ceil(totalCount / limit);
            return { products: products, pages: pages };
        });
    }
    createProduct(name, price, image, imageHeight, imageWidth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.create({ name, image, price, imageHeight, imageWidth }).save();
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findOne(id);
            if (!product) {
                return false;
            }
            yield Product_1.Product.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Product_1.Product),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "product", null);
__decorate([
    type_graphql_1.Query(() => ProductPages),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("offset", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    type_graphql_1.Query(() => ProductPages),
    __param(0, type_graphql_1.Arg("search")),
    __param(1, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("offset", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "searchProducts", null);
__decorate([
    type_graphql_1.Mutation(() => Product_1.Product),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Arg("price", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("image")),
    __param(3, type_graphql_1.Arg("imageHeight", () => type_graphql_1.Int)),
    __param(4, type_graphql_1.Arg("imageWidth", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver(Product_1.Product)
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map