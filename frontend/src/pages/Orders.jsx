import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const { backendURL, token, currency} = useContext(ShopContext);

  const [orderData, setOrderData]=useState([]);
  
        
  const loadOrderData = async () => {
    try {
      if(!token) {
        return null;
      } else {
        const response = await axios.post(backendURL + '/api/order/userorders',{},{headers:{token}})
        if(response.data.success) {
          let allordersItem = [];
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allordersItem.push(item)
            })
          })
          setOrderData(allordersItem.reverse());
        }
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect((e)=>{
    loadOrderData()
  },[token])


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={' ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-780 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-gray-700'>
                    <p className='text-lg'>{currency} {item.price}</p>
                    <p className=''>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p> Date: { new Date(item.date).toDateString() }</p>
                  <p> Payment: { item.paymentMethod }</p>
                
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>


    </div>
  )
}

export default Orders