import { withUrqlClient } from 'next-urql'
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/useGetPostFromURl'

const Post = () => {
    const [{data, error, fetching}] = useGetPostFromUrl()
    if(fetching){
        return (
            <div>loading...</div>
        )
    }
    if(error){
        console.log(error.message)
        return(
            
            <div>{error.message}</div>
        )
    }
    return (
        <div>
            worked
            <div>{data?.post?.title}</div>
            <div>{data?.post?.creator.username}</div>
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(Post)
