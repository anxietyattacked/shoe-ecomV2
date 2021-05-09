import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import React, { useState } from 'react'
import { useDeletePostMutation, useMeQuery, usePostsQuery, useVoteMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import Link from "next/link"
  function Comments() {
    const  [variables, setVariables] = useState({limit: 20, cursor: null as string | null})
    const [{data, error, fetching}] = usePostsQuery({
      variables,
    })
    const [, vote] = useVoteMutation()
    const [{data: meData}] = useMeQuery()
    const[, deletePost] = useDeletePostMutation()
    if(!fetching && !data){
      return (
        <div>{error?.message};
        </div>
      )
    }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{!data && fetching ? (<div>Loading...</div>) : data!.posts.posts.map((d) => !d ? null : (
        <div className="mb-3 flex shadow-md px-3 py-2" key={d.id}>
          <div>
            <button onClick={() => {
                   if(d.voteStatus === 1){
                    return
                  }
              vote({
                postId: d.id,
                value: 1
              })
            }} className={`${d.voteStatus === 1 ? "bg-green-500" : "bg-gray-400"}`}>up</button>
            <button onClick={() => {
              if(d.voteStatus === -1){
                return
              }
              vote({
                postId: d.id,
                value: -1
              })
            }} className={`${d.voteStatus === -1 ? "bg-red-500" : "bg-gray-400"}`}>down</button>
            <div>{d.points}</div>
          </div>
          <div>
          <div className="mb-3">{d.title}</div>
          <div className="text-sm text-gray-400">posted by {d.creator.username}</div>
          <div>{d.textSnippet}</div>
          <Link href='/post/[id]' as={`/post/${d.id}`}>Post</Link>
          {meData?.me?.id !== d.creator.id ? null : <div>
            <button onClick={() => {
              deletePost({id:d.id})
            }} className="bg-red-700 px-3 mr-2 rounded-full">Delete</button>
            <Link href="/edit/[id]" as={`/edit/${d.id}`}><button onClick={() => {
             
            }} className="bg-blue-400 px-3 rounded-full">edit</button></Link>
          </div>}
          </div>
        </div>
      ))}</div>
      {data && data.posts.hasMore ? (
        <div>
          <button onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length -1].createdAt
            })
          }} className="bg-green-400 px-3 py-2 mt-8 rounded-full">Load More</button>
        </div>
      ): null}
    </div>
  )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Comments)