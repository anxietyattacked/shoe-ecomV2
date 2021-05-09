import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link"
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import {useRouter} from "next/router"
import { CartContext } from '../context/cart'
import Hamburger from './hamburger'
import useWindowDimensions from '../utils/useWindowDimensions'
 
const Nav = () => {
    const [{fetching: logoutFetching },logout]  = useLogoutMutation()
    let [isOpen, setIsOpen] = useState(false);
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })
    const [cart, setCart, addToCart, removeFromCart]  = useContext(CartContext)
    const router = useRouter()
    const window = useWindowDimensions()

    let isMobile = (window.width! <= 768)
    let body = null
    if(fetching){

    }else if(!data?.me){
        body = (
            <>
            {!isMobile ? <div className="flex spacing-x-2">
            <Link href="/register"><a className="text-xl px-2">Register</a></Link>
            <Link href="/login"><a className="text-xl px-2">Login</a></Link>
            </div> 
            :null}
            <Link href="/cart"><div>
                <Link href="/cart"><span className="iconify text-3xl" data-icon="ant-design:shopping-cart-outlined" data-inline="false"></span></Link>
                {cart?.length === 0 ? null 
                : <span className="rounded-full h-4 w-4 bg-red-500 text-white absolute right-6 sm:right-8 top-2 flex items-center justify-center text-xs font-bold">
                {cart?.length === 0 ? null :cart?.length}
                </span>}
            </div></Link>
            
            </>
        )
    }else {
        body = (
            <>
            {!isMobile ?<div className="flex spacing-x-2">
            <p className="text-md ml-3 ">Welcome {data.me.username}</p>
            <button onClick={async () => {
                await logout()
                router.reload()
                }} className="text-xl px-2">Logout</button>
            </div> : null}
             <Link href="/cart"><div className="relative">
                <Link href="/cart"><span className="iconify text-3xl" data-icon="ant-design:shopping-cart-outlined" data-inline="false"></span></Link>
                {cart?.length === 0 ? null : <span className="rounded-full h-4 w-4 bg-red-500 text-white absolute right-1 bottom-5 md:bottom-4 text-center flex items-center justify-center text-xs font-bold">
                {cart?.length === 0 ? null :cart?.length}
                </span>}
            </div></Link>
            </>
        )
    }
    return (
        <div className="relative w-full flex px-3 sm:px-5 shadow py-2 justify-between content-center mb-3">
            <div className="flex">
            {isMobile ?<Hamburger isOpen={isOpen} setIsOpen={setIsOpen} data={data} logout={logout} isMobile={isMobile}/> 
            : null}
                <Link  href="/"><a className="text-2xl">SneakerFlex</a></Link></div>
            <div className="flex justify-between mr-2">
                {body}
            </div>
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(Nav)
