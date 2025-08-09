import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className=''>
            <img src={assets.logo} alt="" className='w-32 mb-4' />
            <p className='w-full md:w-2/3 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut est, ex porro provident dolorem unde debitis. Aliquid tempore sint rerum repellendus iusto culpa pariatur dolorem quam, laborum beatae repudiandae autem harum eius temporibus velit minus molestias optio doloremque impedit obcaecati iste quod ducimus nulla. Eos fugit dolorem maxime! Qui, reprehenderit.</p>
         </div>
         <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
         </div>
         <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-9050889943</li>
                <li>contact@foreveryou.com</li>
            </ul>
         </div>
        
    </div>
     <div>
            <p className='py-5 text-sm text-center'>Copyright 2024@ rohitkumar. All Right Reserverd.</p>
        </div>

    </div>
    
  )
}

export default Footer