import React, { useState } from 'react'
import { OperationContext, OperationResult } from 'urql'
import { DeleteCommentMutation, Exact, MeQuery, ProductCommentsQuery } from '../generated/graphql'


interface CommentProps {
    commentData: ProductCommentsQuery | undefined
    meData: MeQuery | undefined
    setCommentId: React.Dispatch<React.SetStateAction<{
        id: number;
        text: string;
    }>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    deleteComment: (variables?: Exact<{
        id: number;
    }> | undefined, context?: Partial<OperationContext> | undefined) => Promise<OperationResult<DeleteCommentMutation>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
    limit: number
}


const Comments : React.FC<CommentProps> = ({commentData, meData, setCommentId, setIsOpen, deleteComment, setOffset, limit}) => {
    const  [currPage, setCurrPage] = useState(1)
    const dateConverter = (commentDate : string) => {
        const mili = parseInt(commentDate) 
        const date = new Date(mili)
        const reformat = date.toLocaleString("en-US", {timeZoneName: "short"})

        return reformat
    }
    let pages = [] as number[]
    for(let i = 0 ; i  < commentData?.productComments.pages!; i++){
      const page = i + 1
      pages.push(page)
    }


    return (
        <div className="">
        <h2 className="bg-gray-700 text-white font-bold text-xl pl-12 py-2">Comments</h2>
        {commentData?.productComments.comments.length === 0 ?
        <div className="mt-3">
            <p className="text-xl">No comments.</p>
        </div>
        : commentData?.productComments.comments.map(comment => (
            <div key={comment.id} className="grid grid-cols-5 border-2 border-solid border-gray-500">
                <div className="col-span-1 bg-gray-700 grid place-content-center p-3">
                <span className="iconify text-7xl text-gray-200" data-icon="ant-design:user-outlined" data-inline="false"></span>
                </div>
                <div className="col-span-4 bg-gray-200">
                    <div className="flex justify-between">
                        <div className="text-xl">User:{comment.creator.username}</div>
                        {meData && comment.creator.id === meData.me?.id ? <div className="flex"> 
                        <div className="mr-2" onClick={() => {
                            setCommentId({id:comment.id, text: comment.text})
                            setIsOpen(true)
                        }}>
                            <span className="iconify text-3xl" data-icon="dashicons:update" data-inline="false"></span>
                        </div>
                        <div className="" onClick={() => deleteComment({id: comment.id})}>  
                        <span  className="iconify text-3xl" data-icon="ant-design:delete-filled" data-inline="false"></span>
                        </div>
                        </div> : null} 
                    </div>
                    <div className="bg-white text-xl padding px-1 py-2">{comment.text}</div>
                    <div>posted:{dateConverter(comment.createdAt)}
                    </div>
                </div>
            </div>
        ))}
         <div className="flex space-x-2 mt-6">
        {pages.map(page => (
        <div key={page} className={`border-solid border border-gray-300 py-2 sm:py-3 px-3 font-bold text-lg shadow-md 
        ${page === currPage ? "border-3 border-solid border-gray-900" : null}`} 
        onClick={() => {
        const num = (page - 1) * limit
        setOffset(num)
        setCurrPage(page)
        }}>
        {page}
        </div>
        ))}
    <div>

    </div>

</div>
</div>

    )
}

export default Comments
