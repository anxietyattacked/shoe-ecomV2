import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  ssrExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
  DeleteCommentMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";
import gql from "graphql-tag";
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login");
      }
    })
  );
};
export const ssrCache = ssrExchange({isClient:!isServer()})

// function invalidateAllPosts(cache: Cache) {
//   const allFields = cache.inspectFields("Query");
//   const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
//   fieldInfos.forEach((fi) => {
//     cache.invalidate("Query", "posts", fi.arguments || {});
//   });
// }
// || "https://sneakerflex-backend.herokuapp.com/graphql"
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string ,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
          CommentsPages: (comment) => comment.id as any,
          ProductPages: (product) => product.id as any,
       
        },
        resolvers: {
          Query: {
           
          },
        },
        updates: {
          Mutation: {
            // deletePost: (_result, args, cache, info) => {
            //   cache.invalidate({
            //     __typename: "Post",
            //     id: (args as DeletePostMutationVariables).id,
            //   });
            // },
            deleteComment: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Comment",
                id: (args as DeleteCommentMutationVariables).id,
              });
            },
            
            createComment: (_result, args, cache, info) => {
              cache.invalidate
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
              // invalidateAllPosts(cache);
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrCache,
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};