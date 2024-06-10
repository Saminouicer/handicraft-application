import React from 'react'
import img from "../data/Artizen_Logo.png"
import axios from 'axios'
import { useAuth } from './Auth'
import { useState } from 'react'
import { useEffect } from 'react'
import ImageComponant from './ImageComponant'

function ClientOrders() {

    const Auth=useAuth()

    const [formData, setFormData] = useState([]);



    const loadOrders=async ()=> {
        const result =await axios.get(`http://localhost:8080/ord/${Auth.user.userId}`, {
          headers: {
            Authorization: `Bearer ${Auth.jwt}`,
          }}
          )
        setFormData(result.data);
      }

      const deleteOrder=async (orderId)=> {
        await axios.delete(`http://localhost:8080/ord/${orderId}`, {
          headers: {
            Authorization: `Bearer ${Auth?.jwt}`,
          }})
          loadOrders()
      }

      useEffect(()=> {
        if(Auth && Auth.jwt &&  Auth.user)loadOrders();
        
       },[Auth])
       if(!Auth && !Auth.jwt &&  !Auth.user.userId)return <div>loading</div>;


  return (
    <>
       {formData.map((order,index)=> {
        return <div className="flex  w-full justify-between m-8 bg-white p-3 rounded-xl">
        <h1 className=" font-bold">quantity: {order.quantity}</h1>
        <p className=" ">description</p>
        <div className='flex justify-between'>

        <button 
        disabled={order.status==="Accepted"}
         onClick={()=> {deleteOrder(order.orderId)}}
           className={` mr-4 p-2 rounded-xl text-white ${order.status==="Accepted"?("bg-red-400"):"bg-red-600"}`}>
            Delete
            </button>

        <div className={order.status==="Pending"?("bg-yellow-400 rounded-xl p-2 text-white"):("bg-green-600 rounded-xl p-2 text-white")}>{order.status}</div>
        </div>
      </div>
       })}
    </>
  )
}

export default ClientOrders