import React from 'react'
import spinner1 from "../assets/svg/spinner1.svg"
export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
        <img src={spinner1} alt="Loading" className='h-24'/>
    </div>
  )
}
