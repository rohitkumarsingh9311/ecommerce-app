import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setcategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Topwear");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const formData= new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("sizes",JSON.stringify(sizes));
      formData.append("bestseller",bestseller);

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}});
      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');

      }
      else {
        console.log(response.data);
        toast.error(response.data.message);
      }

      
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  
  return (
    <form onSubmit={submitHandler}>
    <div>
      <p className='text-xl text-gray-700'> Upload Image</p>
      <div className='flex gap-2 mt-2'>
        <label htmlFor="image1">
          <img src={ !image1 ? assets.upload_area : URL.createObjectURL(image1)} className='w-20'/>
          <input type='file' onChange={(e)=>setImage1(e.target.files[0])} id="image1" className='' hidden/> 
        </label>
        <label htmlFor="image2">
          <img src={ !image2 ? assets.upload_area : URL.createObjectURL(image2)} className='w-20'/>
          <input type='file' onChange={(e)=>setImage2(e.target.files[0])}id="image2" className='' hidden/> 
        </label>
        <label htmlFor="image3">
          <img src={ !image3 ? assets.upload_area : URL.createObjectURL(image3)} className='w-20'/>
          <input type='file' onChange={(e)=>setImage3(e.target.files[0])}id="image3" className='' hidden/> 
        </label>
        <label htmlFor="image4">
          <img src={ !image4 ? assets.upload_area : URL.createObjectURL(image4)} className='w-20'/>
          <input type='file' onChange={(e)=>setImage4(e.target.files[0])}id="image4" className='' hidden/> 
        </label>
      </div>
    </div>

    <div className='w-full mt-2'>
      <p className='mb-2'>Product Name</p>
      <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Type here' value={name} className='w-full max-w-[500px] px-3 py-2 bg-white' required/>
    </div>
    <div className='w-full mt-2'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 py-2 bg-white' required  placeholder='Write content here'></textarea>
    </div>
    <div className='flex flex-row gap-3 mt-4'>
        <div className=''>
          <p className='mb-2'>Product Category</p>
          <select name="" id="" onChange={(e)=>setcategory(e.target.value )} className='w-full max-w-[500px] px-3 py-2 bg-white'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className=''>
          <p className='mb-2'>Product SubCategory</p>
          <select name="" id=""  onChange={(e)=>setSubCategory(e.target.value )} className='w-full max-w-[500px] px-3 py-2 bg-white'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='w-[120px]'>
          <p className='mb-2'>Product Price</p>
          <input type="number" placeholder='Price'  onChange={(e)=>setPrice(e.target.value)} className='w-full max-w-[500px] px-3 py-2 bg-white' required/>
        </div>
    </div>
    <div className='mt-3'>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== 'S') : [...prev, "S"])}>
          <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-2 cursor-pointer`}>S</p>
        </div>
        <div onClick={(e)=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== 'M') : [...prev,"M"])}>
          <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-2 cursor-pointer`}>M</p>
        </div>
        <div onClick={(e)=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== 'L') : [...prev,"L"])}>
          <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-2 cursor-pointer`}>L</p>
        </div>
        <div onClick={(e)=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== 'XL') : [...prev,"XL"])}>
          <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-2 cursor-pointer`}>XL</p>
        </div>
        
        <div onClick={(e)=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== 'XXL') : [...prev,"XXL"])}>
          <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-2 cursor-pointer`}>XXL</p>
        </div>
      </div>

    </div>
    <div className='flex gap-2 mt-5'>
      <input type="checkbox" id="bestseller" onChange={(e)=>setBestseller(prev=>!prev)} checked={bestseller}/>
      <label htmlFor="bestseller" className='cursor-pointer'>BestSeller</label>
    </div>

    <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'> ADD </button>
    
    </form>

  )
}

export default Add