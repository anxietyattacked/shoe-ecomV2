import React,{useContext, useState} from 'react'
import {CardElement, useElements, useStripe, } from "@stripe/react-stripe-js"
import { Formik, Form, Field } from 'formik'
import cart, { CartContext } from '../context/cart'
import { InputField } from './InputField'
import axios from 'axios'
import { PaymentMethod } from '@stripe/stripe-js'
import { useCreateOrderMutation } from '../generated/graphql'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#18b7ed",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#d12d00",
			color: "#d12d00"
		}
	}
}
type CartDetails = {
    productId: number
    name: string
    price: number
    qty: number
    image: string
    imageHeight: number
    imageWidth: number
}

type OrderDetailInput = {
    productId: number
    name: string
    price: number
    qty: number
}
interface ShipDetails{
    name: string
    address: string
    city: string
    state: string
    zipcode: number
    country: string
}

const PaymentForm : React.FC<any> = ({shipping, setIsOpen}) => {
    const [cart, setCart, addToCart, removeFromCart]  = useContext(CartContext)
    const [paySuccess, setPaySuccess] = useState(false)
    const [,createOrder] = useCreateOrderMutation()

    const stripe = useStripe()
    const elements = useElements()

    const total = cart?.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    
    const handleSubmit = async () => {
        const {error, paymentMethod} = await stripe!.createPaymentMethod({
            type: 'card',
            card: elements!.getElement(CardElement) as any,
          });

          if (!error) {
            const { id } : any = paymentMethod;
            const {data} = await axios.post(process.env.NEXT_PUBLIC_STRIPE_API || "https://sneakerflex-backend.herokuapp.com/stripe/charge", {id, amount: total! * 100 })
            try {
              console.log(data);
              setPaySuccess(true)
              console.log(paySuccess)
                let copy : any = cart?.slice()
                let arr: { productId: any; name: any; price: any; qty: any }[] = []
                  copy.forEach((item : any) => {
                 arr.push({
                     productId: item.productId,
                     name: item.name,
                     price: item.price,
                     qty: item.qty
                 })
                })
      
                console.log(arr)
             const response = await createOrder({orderInput:{shipName: shipping.shipName, 
                     shipAddress: shipping.shipAddress,
                     city: shipping.city,
                     state: shipping.state,
                     zipcode: shipping.zipcode,
                     country: shipping.country},
                     cart: arr
                 })
                 setIsOpen(true)
                 if(response){
                     localStorage.clear()
                 }
                 if(!response){
                     console.log("Order Not Created")
                     throw new Error("Order Not Created");
                     
      
             }
            } catch (error) {
              console.log(error);
              setPaySuccess(false)
            }
          }
    }
    
    return (
        <Formik initialValues={{name:"", email:"",  address: "", city:"", state:"", zipcode:"", country:""}} 
        onSubmit={async (values, {setErrors}) => {
            await handleSubmit()
      
          
            

             
             }}>
            {({isSubmitting}) => (
                <Form className="shadow px-2 flex flex-col py-2">
                    
                    <h1 className="text-center text-2xl mb-4">Payment</h1>
                    <div className="grid grid-cols-5">
                    <InputField className="col-span-5 shadow-inner"
                        name="name"
                        label="Name"
                        type="text"
                        />
                        <InputField className="col-span-5 shadow-inner"
                        name="email"
                        label="Email"
                        type="email"
                        />
                             <InputField className="col-span-5 shadow-inner"
                        name="address"
                        label="Address"
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
                            <InputField className="col-span-5 shadow-inner mb-2"
                        name="country"
                        label="Country"
                        type="text"
                        />
                        </div>

                <CardElement className="" options={{
                    iconStyle: "solid",
                    style: {
                        base: {
                            iconColor: "#18b7ed",
                            color: "black",
                            fontWeight: 500,
                            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                            fontSize: "16px",
                            fontSmoothing: "antialiased",
                            ":-webkit-autofill": { color: "#fce883" },
                            "::placeholder": { color: "#87bbfd" }
                        },
                        invalid: {
                            iconColor: "#d12d00",
                            color: "#d12d00"
                        }
                    },
                    hidePostalCode: true
  }} />
        
                    <button className="bg-gray-700 px-3 py-2 mt-8 font-bold text-white text-xl" type="submit" disabled={!stripe}>Place Order</button>
                </Form>
            )}

        </Formik>
    )
}

export default PaymentForm
function createOrder(arg0: { orderInput: { shipName: any; shipAddress: any; city: any; state: any; zipcode: any; country: any }; cart: import("../context/cart").OrderDetailInput[] }) {
    throw new Error('Function not implemented.')
}

