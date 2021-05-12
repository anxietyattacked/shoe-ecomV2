import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  creatorId: Scalars['Float'];
  productId: Scalars['Float'];
  product: Product;
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentsPages = {
  __typename?: 'CommentsPages';
  comments: Array<Comment>;
  pages: Scalars['Int'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createProduct: Product;
  deleteProduct: Scalars['Boolean'];
  createOrder: OrderResponse;
  updateShipping?: Maybe<Order>;
  updateCartQty?: Maybe<OrderDetail>;
  deleteOrderDetail: Scalars['Boolean'];
  deleteOrder: Scalars['Boolean'];
  createComment: Comment;
  updateComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deleteAllProductComments: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateProductArgs = {
  imageWidth: Scalars['Int'];
  imageHeight: Scalars['Int'];
  image: Scalars['String'];
  price: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationCreateOrderArgs = {
  cart: Array<OrderDetailInput>;
  orderInput: OrderInput;
};


export type MutationUpdateShippingArgs = {
  input: OrderInput;
  id: Scalars['Int'];
};


export type MutationUpdateCartQtyArgs = {
  qty: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteOrderDetailArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  productId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  text: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteAllProductCommentsArgs = {
  productId: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  total: Scalars['Float'];
  shipName: Scalars['String'];
  shipAddress: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zipcode: Scalars['Float'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  id: Scalars['Float'];
  productId: Scalars['Float'];
  orderId: Scalars['Float'];
  order: Order;
  product: Product;
  name: Scalars['String'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OrderDetailInput = {
  productId: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
};

export type OrderInput = {
  shipName: Scalars['String'];
  shipAddress: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zipcode: Scalars['Float'];
  country: Scalars['String'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<OrderFieldError>>;
  order: Order;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  votes: Vote;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  image: Scalars['String'];
  imageHeight: Scalars['Float'];
  imageWidth: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProductPages = {
  __typename?: 'ProductPages';
  products: Array<Product>;
  pages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  product: Product;
  products: ProductPages;
  searchProducts: ProductPages;
  order?: Maybe<WholeOrder>;
  orders?: Maybe<Array<WholeOrder>>;
  comment: Comment;
  productComments: CommentsPages;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QuerySearchProductsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  search: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};


export type QueryCommentArgs = {
  id: Scalars['Int'];
};


export type QueryProductCommentsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  productId: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  value: Scalars['Float'];
};

export type WholeOrder = {
  __typename?: 'WholeOrder';
  id: Scalars['Int'];
  total: Scalars['Float'];
  shipName: Scalars['String'];
  shipAddress: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zipcode: Scalars['Float'];
  country: Scalars['String'];
  orderDetails: Array<OrderDetail>;
};

export type OrderFieldError = {
  __typename?: 'orderFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  productId: Scalars['Int'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'creatorId' | 'productId' | 'text' | 'createdAt'>
  ) }
);

export type CreateOrderMutationVariables = Exact<{
  orderInput: OrderInput;
  cart: Array<OrderDetailInput> | OrderDetailInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'OrderResponse' }
    & { order: (
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'total' | 'shipName' | 'shipAddress' | 'city' | 'state' | 'zipcode' | 'country'>
    ) }
  ) }
);

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String'];
  price: Scalars['Int'];
  image: Scalars['String'];
  imageWidth: Scalars['Int'];
  imageHeight: Scalars['Int'];
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageWidth' | 'imageHeight' | 'createdAt' | 'updatedAt'>
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateComment'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type OrderQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OrderQuery = (
  { __typename?: 'Query' }
  & { order?: Maybe<(
    { __typename?: 'WholeOrder' }
    & Pick<WholeOrder, 'id' | 'shipName' | 'shipAddress' | 'city' | 'state' | 'zipcode' | 'country'>
    & { orderDetails: Array<(
      { __typename?: 'OrderDetail' }
      & Pick<OrderDetail, 'id' | 'productId' | 'orderId' | 'name' | 'price' | 'qty'>
    )> }
  )> }
);

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = (
  { __typename?: 'Query' }
  & { orders?: Maybe<Array<(
    { __typename?: 'WholeOrder' }
    & Pick<WholeOrder, 'id' | 'shipName' | 'shipAddress' | 'city' | 'state' | 'zipcode' | 'country'>
    & { orderDetails: Array<(
      { __typename?: 'OrderDetail' }
      & Pick<OrderDetail, 'productId' | 'orderId' | 'id' | 'name' | 'price' | 'qty'>
    )> }
  )>> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageWidth' | 'imageHeight'>
  ) }
);

export type ProductCommentsQueryVariables = Exact<{
  productId: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type ProductCommentsQuery = (
  { __typename?: 'Query' }
  & { productComments: (
    { __typename?: 'CommentsPages' }
    & Pick<CommentsPages, 'pages'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id'>
      ) }
    )> }
  ) }
);

export type ProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: (
    { __typename?: 'ProductPages' }
    & Pick<ProductPages, 'pages'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageHeight' | 'imageWidth'>
    )> }
  ) }
);

export type SearchProductsQueryVariables = Exact<{
  search: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type SearchProductsQuery = (
  { __typename?: 'Query' }
  & { searchProducts: (
    { __typename?: 'ProductPages' }
    & Pick<ProductPages, 'pages'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageHeight' | 'imageWidth'>
    )> }
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $productId: Int!) {
  createComment(text: $text, productId: $productId) {
    creatorId
    productId
    text
    createdAt
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateOrderDocument = gql`
    mutation CreateOrder($orderInput: OrderInput!, $cart: [OrderDetailInput!]!) {
  createOrder(orderInput: $orderInput, cart: $cart) {
    order {
      id
      total
      shipName
      shipAddress
      city
      state
      zipcode
      country
    }
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($name: String!, $price: Int!, $image: String!, $imageWidth: Int!, $imageHeight: Int!) {
  createProduct(
    name: $name
    price: $price
    image: $image
    imageWidth: $imageWidth
    imageHeight: $imageHeight
  ) {
    id
    name
    price
    image
    imageWidth
    imageHeight
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: Int!, $text: String!) {
  updateComment(id: $id, text: $text)
}
    `;

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const OrderDocument = gql`
    query Order($id: Int!) {
  order(id: $id) {
    id
    shipName
    shipAddress
    city
    state
    zipcode
    country
    orderDetails {
      id
      productId
      orderId
      name
      price
      qty
    }
  }
}
    `;

export function useOrderQuery(options: Omit<Urql.UseQueryArgs<OrderQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OrderQuery>({ query: OrderDocument, ...options });
};
export const OrdersDocument = gql`
    query Orders {
  orders {
    id
    shipName
    shipAddress
    city
    state
    zipcode
    country
    orderDetails {
      productId
      orderId
      id
      name
      price
      qty
    }
  }
}
    `;

export function useOrdersQuery(options: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    id
    name
    price
    image
    imageWidth
    imageHeight
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductCommentsDocument = gql`
    query ProductComments($productId: Int!, $limit: Int!, $offset: Int!) {
  productComments(productId: $productId, limit: $limit, offset: $offset) {
    comments {
      id
      text
      createdAt
      updatedAt
      creator {
        username
        id
      }
    }
    pages
  }
}
    `;

export function useProductCommentsQuery(options: Omit<Urql.UseQueryArgs<ProductCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductCommentsQuery>({ query: ProductCommentsDocument, ...options });
};
export const ProductsDocument = gql`
    query Products($limit: Int!, $offset: Int!) {
  products(limit: $limit, offset: $offset) {
    products {
      id
      name
      price
      image
      imageHeight
      imageWidth
    }
    pages
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const SearchProductsDocument = gql`
    query SearchProducts($search: String!, $limit: Int!, $offset: Int!) {
  searchProducts(search: $search, limit: $limit, offset: $offset) {
    products {
      id
      name
      price
      image
      imageHeight
      imageWidth
    }
    pages
  }
}
    `;

export function useSearchProductsQuery(options: Omit<Urql.UseQueryArgs<SearchProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchProductsQuery>({ query: SearchProductsDocument, ...options });
};