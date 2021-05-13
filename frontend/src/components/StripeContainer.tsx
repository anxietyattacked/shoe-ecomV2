import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

interface ShipDetails{
    name: string
    address: string
    city: string
    state: string
    zipcode: number
    country: string
}
type Props = ShipDetails & { children: React.ReactNode }

const StripeContainer : React.FC<ShipDetails> = () => {
    
    const PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY as string
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
    return (
        <Elements  stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default StripeContainer
