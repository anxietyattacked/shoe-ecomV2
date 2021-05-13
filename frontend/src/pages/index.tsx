import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from "next/image"
import React, { useState, useRef } from 'react'
import { useProductQuery, useProductsQuery, useSearchProductsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Field, Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import DialogPop from '../components/Dialog'
const SearchBar = dynamic(() => import('../components/SearchBar'), {ssr:false})
import Products from '../components/Products'
import useWindowDimensions from '../utils/useWindowDimensions'

  function Home() {
    const limit = 8
    
    const  [variables, setVariables] = useState({limit: limit, offset: 0})
    const  [currPage, setCurrPage] = useState(1)
    const [{data, error, fetching}] = useProductsQuery({variables: variables})
    const [search, setSearch] = useState("")
    const window = useWindowDimensions()

    const [{data:sData, error:sError, fetching:sFetching}] = useSearchProductsQuery({variables:{search:search, limit:variables.limit, offset:variables.offset}})
    

    


    const dSrc = search !== "" ? sData?.searchProducts.pages : data?.products.pages!
    let pages = [] as number[]
    for(let i = 0 ; i  < dSrc!; i++){
      const page = i + 1
      pages.push(page)
    }
        
    let isMobile = (window.width! <= 768)
  return (
    <>
    <Head>
    <title>SneakerFlex</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className="mx-3 sm:mx-5 lg:mx-5 ">
    
      {/* <div className="mb-3 bg-hero bg-center bg-fill bg-no-repeat py-44 md:p-60 lg:p-96">
        
      </div> */}
      <div className="grid grid-cols-10">
      <div className="col-span-10 md:col-span-2 p-20 bgreen relative">
        {/* <div className="absolute bottom-0 top-3 md:top-5 left-0 right-0 w-full z-10"><h1 className="text-5xl sm:text-5xl md:text-8xl lg:text-9xl text-center text-white font-bold">Kicks</h1></div>
        <div className="absolute bottom-5 left-0 right-0 w-100 z-10"><h1 className="text-5xl sm:text-5xl md:text-8xl lg:text-9xl text-center text-white font-bold">For The Soul</h1></div> */}
      </div>
      <div className="relative bgreen dee2 pb-3 col-span-10 md:col-start-3 md:col-end-9">
        <Image className="absolute bottom-0 top-0 left-0 right-0 w-full" layout="responsive"  src="/images/test.jpg" width={1920} height={1159}/>
        <div className="absolute bottom-0 top-0 md:top-0 lg:top-5 2xl:top-3 left-0 right-0 w-full z-10"><h1 className="text-4xl md:text-6xl 2xl:text-9xl text-center text-white font-bold">Kicks</h1></div>
        <div className="absolute bottom-0 sm:bottom-5 left-0 right-0 w-100 z-10"><h1 className="text-4xl md:text-6xl 2xl:text-9xl text-center text-white font-bold">For The Soul</h1></div>
      </div>
      
  
      <div className="col-span-10 md:col-span-2 p-20 md:p-10 bgreen relative">
        {/* <div className="absolute bottom-0 top-3 md:top-5 left-0 right-0 w-full z-10"><h1 className="text-5xl sm:text-5xl md:text-8xl lg:text-9xl text-center text-white font-bold">Kicks</h1></div>
        <div className="absolute bottom-5 left-0 right-0 w-100 z-10"><h1 className="text-5xl sm:text-5xl md:text-8xl lg:text-9xl text-center text-white font-bold">For The Soul</h1></div> */}
      </div>
      </div>
      
      <div>
      <SearchBar setSearch={setSearch}/>
      </div>
      <Products search={search} data={data} sData={sData}/>
      <div className="flex space-x-2 mt-6">
      {pages.map(page => (
        <div key={page} className={`border-solid border border-gray-300 py-2 sm:py-3 px-3 font-bold text-lg shadow-md 
        ${page === currPage ? "border-3 border-solid border-gray-900" : null}`} 
        onClick={() => {
          const num = (page - 1) * limit
          setVariables({limit: limit, offset: num})
          setCurrPage(page)
        }}>
        {page}
      </div>
      ))}
      </div>
    </div>
    </>
  )
}
export default withUrqlClient(createUrqlClient)(Home)