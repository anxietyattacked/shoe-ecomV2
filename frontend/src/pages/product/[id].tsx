import { withUrqlClient } from 'next-urql'
import React, { useContext, useState } from 'react'
import { Exact, useCreateCommentMutation, useDeleteCommentMutation, useMeQuery, useProductCommentsQuery, useProductQuery, useUpdateCommentMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetIntId } from '../../utils/useGetIntId'
import Image from "next/image"
import {CartContext} from "../../context/cart"
import { isServer } from '../../utils/isServer'
import { Formik, Form, Field } from 'formik'
import dynamic from "next/dynamic"
import {useRouter} from 'next/router'
import EditComment from '../../components/EditComment'
import ProductComp from '../../components/Product'
const Comments = dynamic(() => import('../../components/Comments'), {ssr: false})
import Head from 'next/head'


const Product : React.FC = () => {
    const intId = useGetIntId()
    const router = useRouter()
    const prodId = intId
    const test = parseInt(router?.query.id as string)
    const limit = 4
    const [{data, fetching, error}] = useProductQuery({variables:{id:intId}})
    const  [offset, setOffset] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [commentId, setCommentId] = useState({id: -1, text: ""})
    const  [currPage, setCurrPage] = useState(1)
    const [{data: commentData, fetching: commentFetching}] = useProductCommentsQuery({variables: {productId: intId, limit: limit, offset: offset}})
    const [qty, setQty] = useState(1)
    const [cart, setCart, addToCart, removeFromCart]  = useContext(CartContext)
    const [{data: meData}] = useMeQuery()
    const [,createComment] = useCreateCommentMutation()
    const [,updateComment] = useUpdateCommentMutation()
    const[, deleteComment] = useDeleteCommentMutation()
    
   
    if(fetching && !data){
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
    if(!fetching && !data){
        return <div>Product not found</div>
    }
    console.log(intId)
    console.log(data?.product)
    return (
        <>
            <Head>
    <title>SneakerFlex - {data?.product.name}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>   
        <EditComment isOpen={isOpen} setIsOpen={setIsOpen} updateComment={updateComment} commentId={commentId}/>
        <div className="min-h-screen px-3 ">
            <ProductComp data={data}  cart={cart} addToCart={addToCart} qty={qty} setQty={setQty} />
           
            <div className={`mt-32 md:mt-8 grid grid-cols-1 ${meData?.me ? 'md:grid-cols-2' : ""}`}>
                <Comments commentData={commentData} meData={meData} limit={limit} setCommentId={setCommentId}
                setIsOpen={setIsOpen} deleteComment={deleteComment} setOffset={setOffset}/>
                
                {meData?.me ? 
        <div>
            <Formik initialValues={{ text: ""}} 
            onSubmit={async (values) => {
                 const {error} = await createComment({productId:intId,text: values.text})
                if(!error){
                    router.reload()
                }
                 
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col px-4 py-4">
                        <h1 className="text-center text-2xl mb-4">Comment</h1>
                        <label htmlFor="text">Comment</label>
                        <Field className="shadow-inner" rows={10} cols={10} as="textarea" name="text" />
                        <button  type="submit" disabled={isSubmitting} className="bg-gray-700 text-white font-bold text-xl px-3 py-2 mt-8">Create Post</button>
                        
                    </Form>
                )}

            </Formik>
        </div>  
        : null}
            </div>
        </div>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(Product)
