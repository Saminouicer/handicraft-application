import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

function MakeOrder() {
    const {productId}=useParams()
    const Auth=useAuth()
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
      quantity: '',
      productId:productId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  
  
      const handleSubmit = async (e) => {
        e.preventDefault();
    
    
      await axios.post(`http://localhost:8080/ord/${Auth.user.userId}`, formData,{
        headers: {
          Authorization: `Bearer ${Auth.jwt}`,
        }}
        )
          navigate("/")
        }


  return (
    <>
    <h1 className='text-center my-6 font-bold'>Make Order</h1>
<div className="flex justify-center mt-8">
<form className="w-full max-w-md" onSubmit={handleSubmit}>
<div className="mb-4">
 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
   quantity
 </label>
 <input
   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
   id="quantity"
   type="number"
   placeholder="quantity"
   name="quantity"
   value={formData.quantity}
   onChange={handleChange}
 />
</div>



<div className="flex items-center justify-between">
 <button
   className="bg-[#F88D2F] hover:bg-[#e78a39] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
   type="submit"
 >
   Submit
 </button>
</div>
</form>
</div>
</>
  )
}

export default MakeOrder