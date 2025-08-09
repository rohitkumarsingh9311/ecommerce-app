import React, { useContext, useEffect } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductsItem from './ProductsItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = React.useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi debitis ipsam ipsa, quo maxime voluptatum suscipit aliquid dolores ex blanditiis obcaecati fugit. Odio quidem magni consequatur ad a perspiciatis iusto?</p>
        </div>

        {/*  Rendering Products*/}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestProducts.map((item,index)=>(
                    <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection