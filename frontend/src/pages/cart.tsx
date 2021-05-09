import { Field, Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import React, { useContext } from 'react'
import { UseCart, CartContext, Test, OrderDetailInput } from '../context/cart'
import { createUrqlClient } from '../utils/createUrqlClient'
import Image from "next/image"
import Head from 'next/head'



const cart = () => {
    const [cart, setCart, addToCart, removeFromCart]  = useContext(CartContext)
    if(cart === []){
       return <div>No items in cart</div>
    }

    const  handleValueChange = (e : any, id : number , cart : OrderDetailInput[]) => {
        let copy = cart.slice()
        const product = copy.findIndex(product => product.productId ===  id)
        if(product !== -1){
          let productCopy = {...copy[product]}
          productCopy.qty =  parseInt(e.target.value)
          copy[product] = productCopy
          setCart!(copy)
        
        }
    }
    
    return (
        <div className="min-h-screen">
                <Head>
    <title>SneakerFlex - Cart</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
            

            <Formik initialValues={{}} 
            onSubmit={async (values, {setErrors}) => {
                 
                 }}>
                {({isSubmitting}) => (
                    <Form className="grid gap-2 grid-cols-7 px-4 py-4">
                        <h1 className="col-span-10 stext-center text-4xl text-center mb-4">Cart</h1>
                        {cart?.length === 0 ? <div className="text-2xl col-span-7 text-center">No items in cart</div> :
                        cart?.map(item => (
                <div key={item.productId} className="grid grid-cols-10 col-span-10">
                <div className="relative dee border-solid border-2 border-gray-50">
                <Image  width={item.imageWidth!} height={item.imageHeight!} src={item.image!} alt={item.name}/>
                </div>
                <div className="col-span-4 border-solid border-2 border-gray-50">{item.name}</div>
                <div className="col-span-2 border-solid border-2 border-gray-50">
                    <label htmlFor={item.name}>Qty: </label>
                    <Field id={item.productId} name={item.name} className="shadow-inner" onChange={(e : any) => {
                 handleValueChange(e, item.productId, cart)
                }} value={item.qty} min={1} max={99} type="number"/></div>
                <div className="col-span-2 border-solid border-2 border-gray-50 px-1">$<strong>{item.price}</strong></div>
               <div className="place-self-center" onClick={() => {
                       removeFromCart!(cart, item.productId)
                       console.log(cart)
                   }}>
               <span className="iconify" data-icon="ant-design:delete-filled" data-inline="false" onClick={() => {
                       removeFromCart!(cart, item.productId)
                       console.log(cart)
                   }}></span>
        
               </div>
                </div>
            ))}
            <div className="flex justify-center col-start-5 col-end-7"><strong>Total: ${cart?.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}</strong></div>   
                        {cart?.length === 0 ? null :
                        <Link href="/order"><button  type="submit" disabled={isSubmitting} className="col-span-10 bg-gray-700 px-3 py-2 mt-8 text-white font-bold text-xl">Order</button></Link>}
                    </Form>
                )}

            </Formik>
                 
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(cart)