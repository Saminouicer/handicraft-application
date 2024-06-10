import React from 'react'
import { Link } from 'react-router-dom'
import craftsmanImage from '../data/pixlr-image-generator-6b988e6b-d471-4318-8bd7-d6f5520b91a1.png'
import clientImage from '../data/pixlr-image-generator-e5a19523-ac7a-4383-ab72-c596a1515c9b.png'

function Logup() {
  return (
   <div className='flex justify-center'>
     <div className='flex justify-between w-[900px] text-center'>
        <div className='craftsmanLogup py-7'>
        <Link to={"/CraftsmanLogup"}>
          <h1 className='bg-green-400 font-bold text-white p-3'>Craftsman Profile</h1>
            <div className='img'>
            <img src={craftsmanImage} alt="" />
            </div>
        </Link>
        </div>
        <div className='clientLogup py-7'>
        <Link to={"/ClientLogup"}>
          <h1 className='bg-blue-400 font-bold text-white p-3'>Client Profile</h1>
          <div className='img'>
          <img src={clientImage} alt="" />
          </div>
        </Link>
        </div>
    </div>
   </div>
  )
}

export default Logup