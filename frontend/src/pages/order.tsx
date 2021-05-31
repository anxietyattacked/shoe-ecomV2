import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import Link from 'next/link'
import router from 'next/router'
import React, { useContext, useState } from 'react'
import DialogPop from '../components/Dialog'
import { InputField } from '../components/InputField'
import PaymentForm from '../components/PaymentForm'
import StripeContainer from '../components/StripeContainer'
import { CartContext } from '../context/cart'
import { useCreateOrderMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

type OrderDetailInput = {
    productId: number
    name: string
    price: number
    qty: number
    image: string
    imageHeight: number
    imageWidth: number
}

interface ShipDetails{
    name: string
    address: string
    city: string
    state: string
    zipcode: number
    country: string
}
interface ShipInputDetails{
    shipName: string
    shipAddress: string
    city: string
    state: string
    zipcode: number
    country: string
}
type Props = ShipDetails & { children: React.ReactNode }
const order = () => {
    const [cart, setCart, addToCart, removeFromCart]  = useContext(CartContext)
    const [shipping, setShipping] = useState({})
    let [isOpen, setIsOpen] = useState(false);
    const [isDemo, setIsDemo] =  useState(false)
    const [,createOrder] = useCreateOrderMutation()
    if(cart?.length === 0){
        return <div>no item in cart</div>
    }

    const total = cart?.reduce((acc, curr) => acc + curr.price * curr.qty, 0)


    const PUBLIC_KEY = "pk_test_51IjtJLAb9iEiNhPbE7yCSblATPeGX2lZyRr0nsOFsVoBclMvJRy5K6z9IpagCRQksDim6s47OMszmsNk84w1EZ3V008wHgQ723" 
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
    console.log(shipping)


    return (
        <>
            <Head>
    <title>SneakerFlex - Order</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
        <DialogPop isOpen={isOpen} setIsOpen={setIsOpen} setCart={setCart}/>
        <div className="py-10 px-3 min-h-screen grid place-content-center">
            {shipping && Object.keys(shipping).length !== 0 && shipping.constructor === Object  ?  
           <Elements  stripe={stripeTestPromise}>
           <PaymentForm shipping={shipping} setIsOpen={setIsOpen} isDemo={isDemo}/>
       </Elements>
            :  <Formik enableReinitialize={true}
             initialValues ={{shipName: isDemo === true ? "John Smith" : "", 
            shipAddress: isDemo === true ? "123 Fake Street Drive" : "", 
            city: isDemo === true ? "Seattle" : "", 
            state:isDemo === true ? "WA" : "", 
            zipcode: isDemo === true ? "98116" : "", 
            country:isDemo === true ? "United States" : ""}}

            onSubmit={async (values, {setErrors}) => {
                if(cart?.length === 0){
                    return
                }
                setShipping({shipName: values.shipName, 
                            shipAddress: values.shipAddress,
                            city: values.city,
                            state: values.state,
                            zipcode: parseInt(values.zipcode),
                            country: values.country})            
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col shadow px-4 py-4">
                        <h1 className="text-center text-2xl mb-4">Shipping</h1>
                        <div className="flex mb-4">
                            <label htmlFor="demo"><strong>Demo Info</strong></label>
                            <input className="mt-2" type="checkbox" id="demo" name="demo" value="yes" onChange={() => setIsDemo(!isDemo)}/>
                            
                        </div>
                        <div className="grid grid-cols-5">
                        <InputField className="col-span-5 shadow-inner"
                        name="shipName"
                        label="Full Name"
                        type="text"
                        />
                            <InputField className="col-span-5 shadow-inner"
                        name="shipAddress"
                        label="Addresss"
                        type="text"
                        />
                        <InputField className="col-span-5 shadow-inner"
                        name="city"
                        label="City"
                        type="text"
                        />
                            <InputField className="col-span-5 shadow-inner"
                        name="state"
                        label="State"
                        type="text"
                        />
                        <InputField className="col-span-5 shadow-inner"
                        name="zipcode"
                        label="Zipcode"
                        type="number"
                        />
                            <InputField className="col-span-5 shadow-inner"
                        name="country"
                        label="Country"
                        type="text"
                        />
                        </div>
                    
                        <button  type="submit" disabled={isSubmitting} className="bg-gray-700 text-white font-bold text-xl px-3 py-2 mt-8">Payment</button>
                    </Form>
                )}

            </Formik>
            
            
            }
              
        </div>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(order)
