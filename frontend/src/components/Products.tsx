import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import { ProductsQuery, SearchProductsQuery } from '../generated/graphql'
interface ProductsProps{
search: string
data: ProductsQuery | undefined
sData: SearchProductsQuery | undefined
}


const Products : React.FC<ProductsProps> = ({search, data, sData}) => {


    return (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {search === "" ? data?.products.products.map(d => (
          <div key={d.id} className="shadow">
            <div className="grid grid-cols-5">
            <div className="col-span-5 p-3">
              <div className="relative dee">
              <Link href="/product/[id]" as={`/product/${d.id}`} passHref>
                <a href="">
                <Image layout="responsive" className="absolute bottom-0 left 0 top-0 right object-cover object-bottom w-full" width={d.imageWidth} height={d.imageHeight} src={d.image} alt={d.name}/>
                </a>
                </Link>
                </div>
            </div>
            <div className="col-span-5 mx-4 mb-3 text-md whitespace-pre-wrap">
                <Link passHref href="/product/[id]" as={`/product/${d.id}`}><a>{d.name}</a></Link>
                </div>
            <div className="col-start-5 col-end-6 mb-1 flex justify-end mr-2">
            <div className="text-lg "><strong>${d.price}</strong></div>
            </div>
            </div>
          </div>
        ))
        :
        sData?.searchProducts.products.map(d => (
          <div key={d.id} className="shadow">
            <div className="grid grid-cols-5">
            <div className="col-span-5 p-3">
              <div className="relative dee">
              <Link href="/product/[id]" as={`/product/${d.id}`} passHref>
                <a href="">
                <Image layout="responsive" className="absolute bottom-0 left 0 top-0 right object-cover object-bottom w-full" width={d.imageWidth} height={d.imageHeight} src={d.image} alt={d.name}/>
                </a>
                </Link>
                </div>
            </div>
            <div className="col-span-5 mx-4 mb-1 text-md whitespace-pre-wrap">
                <Link href="/product/[id]" as={`/product/${d.id}`} passHref><a>{d.name}</a></Link>
                </div>
                <div className="col-start-5 col-end-6 mb-1 flex justify-end mr-2">
            <div className="text-lg self-end "><strong>${d.price}</strong></div>
            </div>
            </div>
          </div>
        ))
        }
        
      </div>
    )
}

export default React.memo(Products)
