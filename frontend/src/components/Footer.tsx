import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="px-3 sm:px-5 bg-gray-700 mt-4 py-2">
            <div><Link  href="/"><a className="text-2xl ml-1 text-white">SneakerFlex</a></Link></div>
        </div>
    )
}

export default Footer
