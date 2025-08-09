import React, { use, useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductsItem from '../components/ProductsItem'

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct]=useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const onChangeCategory = (event) => {
    if(category.includes(event.target.value)){
      setCategory(category.filter((item) => item !== event.target.value));
    } else {
      setCategory([...category, event.target.value]);
    }
  }

  const onChangeSubcategory = (event) => { 
    if(subCategory.includes(event.target.value)){
      setSubCategory(subCategory.filter((item) => item != event.target.value))
    } else {
      setSubCategory([...subCategory, event.target.value]);
    }
  }

  const applyFilter = () => {
    
    let filteredProducts = products;
    if(showSearch && search) {
      filteredProducts=filteredProducts.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0) {
      filteredProducts = filteredProducts.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => subCategory.includes(item.subCategory));
    }
    
    setFilterProduct(filteredProducts);
  }

  const sortProducts = () =>{
    let fpCopy = filterProduct.slice();

    switch (sortType) {
      case 'low-high' :
        fpCopy.sort((a, b) => a.price -b.price);
        setFilterProduct(fpCopy);
        break;
      case 'high-low' :
        fpCopy.sort((a, b) => b.price - a.price);
        setFilterProduct(fpCopy);
        break;
      default:
        setFilterProduct(fpCopy);
        applyFilter();
        break; 
    }

  }
  

  useEffect(()=>{
    setFilterProduct(products);
  },[])

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products]);

  useEffect(()=>{
    sortProducts();
  },[sortType, filterProduct]);

  return (
          
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/*  Filter option */} 
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          
          <p className='mb-3 text-sm font-medium'>CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={onChangeCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={onChangeCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={onChangeCategory}/>Kids
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={onChangeSubcategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={onChangeSubcategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={onChangeSubcategory}/>Winterwear
            </p>
          </div>
        </div>

        
      </div>

      {/* Right Side Container */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={' Collection'}/>
          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={(e) => setSortType(e.target.value)}>
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: Hight to low</option>
          </select>
        </div>
        {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            
            filterProduct.map((item,index)=>(
              <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>



      </div>

      


    </div>
  )
}

export default Collections