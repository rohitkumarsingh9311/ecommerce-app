import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex flex-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} />
        <button className='bg-gray-600 rounded-full text-sm px-4 py-2 text-white' onClick={()=>setToken('')}>Logout</button>

    </div>
  )
}

export default Navbar