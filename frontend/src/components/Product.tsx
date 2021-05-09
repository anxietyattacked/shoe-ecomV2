import React from 'react'
import { OrderDetailInput, ProductQuery } from '../generated/graphql'
import Image from "next/image"
import { ProductProps } from '../context/cart'

interface ProductCompProps{
    data: ProductQuery | undefined
    qty: number
    setQty: React.Dispatch<React.SetStateAction<number>>
    cart: OrderDetailInput[] | undefined
    addToCart: ((product: ProductProps, qty: number) => void) | undefined
}

const ProductComp : React.FC<ProductCompProps> = ({data, qty, setQty, cart, addToCart}) => {
    return (
        <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-3">
        <Image  width={data!.product!.imageWidth!} height={data!.product!.imageHeight!} src={data!.product!.image!} alt={data?.product.name}/>
        </div>
        <div className="grid grid-cols-2 col-span-5 md:col-span-2">
        <div className="col-span-2 text-2xl ml-1 md: text-3xl">{data?.product.name}</div>
        <div className="col-span-2 place-self-end md:place-self-end text-3xl mr-1"><strong>${data?.product.price}</strong></div>
        <div className="col-span-2 mb-3 text-2xl md:mb-0">Qty: <input onChange={(e) => 
        setQty(parseInt(e.target.value))
        } 
        defaultValue={qty} name="qty" min={1} max={99} type="number" className="shadow-inner w-full text-2xl"/></div>
        <button className="bg-gray-700 text-white font-bold text-xl px-3 py-2  md:mb-2 col-span-2 place-self-center md:place-self-end w-full"
        onClick={(e) => {
        if(!cart && !data){
            return
        }
        addToCart!(data?.product! as any, qty)
        }}
        >Add To Cart</button>
        </div>
        
       <div> 
    </div></div>
    )
}

export default ProductComp
