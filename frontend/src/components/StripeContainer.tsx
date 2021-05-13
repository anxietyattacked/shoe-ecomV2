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
    
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string || "pk_test_51IjtJLAb9iEiNhPbE7yCSblATPeGX2lZyRr0nsOFsVoBclMvJRy5K6z9IpagCRQksDim6s47OMszmsNk84w1EZ3V008wHgQ723" 
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
    return (
        <Elements  stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default StripeContainer
