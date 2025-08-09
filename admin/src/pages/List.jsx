import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { backendUrl } from '../App';
import { currency } from '../App';
import { toast } from 'react-toastify'

const List = ({token}) => {

  

  const [list, setList] = useState([]);

const fatchList = async() => {
  try {
      const response = await axios.get(backendUrl+ "/api/product/list", {headers:{token}})
      if(response.data.products){
        
      setList(response.data.products)
      }
      else {
        toast.error(response.data.message);
      }
    
  } catch (error) {
    console.log(error.message);
    toast.error(error.message)
  }
}

const removeProduct = async(id) => {
  try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}});
      console.log(response);
      if(response.data.success) {
        toast.success(response.data.message);
        await fatchList();
      } else {
        toast.error (response.data.message)
      }
      
  } catch (error) {
    console.log(error.message);
    toast.error(error.message)
  }
  
}

useEffect(()=>{
  fatchList();
},[])
  return (
    <div>
        <p className='text-bold text-xl mb-3'>All Products</p>
          <div className='flex flex-col gap-2'>
            {/* List table title */}

            <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm border-gray-200'>
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Sizes</b>
              <b>Price</b>
              <b className='text-center'>Action</b>
            </div>

            {/* product list */}

            {
              list.map((item,index) => (
                <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-2 border border-gray-200 items-center'>
                  <img src={item.image[0]} alt="" className='w-12'/> 
                  <p className=''>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.sizes}</p>
                  <p>{currency} {item.price}</p>
                  <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>

                </div>
              ))
            }
          </div>
    </div>
  )
}

export default List