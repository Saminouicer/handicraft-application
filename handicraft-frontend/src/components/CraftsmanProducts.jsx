import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './Auth'
import image1 from"../data/Ceramique-dart01.jpg"
import { useState } from 'react'
import ImageComponant from './ImageComponant'


function CraftsmanProducts(props) {
  const Auth=useAuth()
    // const [fileName, setFileName] = useState('');
    // const [imageSrc, setImageSrc] = useState('');


    //    const loadImage = async () => {
    //     // if (!fileName) {
    //     //     alert('Please enter a file name.');
    //     //     return;
    //     // }

    //     try {
    //       if(props.product.imageData.name) {
    //         const response = await axios.get(`http://localhost:8080/image/${props.product.imageData.name}`, {
    //           headers: {
    //             Authorization: `Bearer ${Auth.jwt}`,
    //           },
    //           responseType: 'arraybuffer',
    //         });
    //       const imageBlob = new Blob([response.data], { type: 'image/png' });
    //       const imageUrl = URL.createObjectURL(imageBlob);
    //       setImageSrc(imageUrl);
    //       }
    //     } catch (error) {
    //         console.error('Error downloading image:', error);
    //         setImageSrc('');
    //         // alert('Failed to download image.');
    //     }
    // };


  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:8080/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
      props.load()
  };

  // useEffect(()=> {
  //   loadImage()
  // },[props.product.imageData])

  return (
              <div className='product'>
                  <div className='image mb-2'>
                    <ImageComponant
                    product={props.product}/>
                  </div>
                  <h1 className='mb-2 font-bold'>{props.product.name}</h1>
                  <p className='mb-2 h-[35px]'>{props.product.description}</p>
                  <p className='mb-2 h-[35px]'>Category : {props.product.category}</p>
                  <div className='flex justify-between mb-2 text-[#777]'>
                    <span>price</span>
                    <span>{props.product.price}$</span>
                  </div>
                  {/* <button className='w-full text-white block bg-violet-700 rounded-xl p-1'>Purchase</button> */}
                  <div className='w-full flex justify-between px-5 text-white mt-6'>
                    <button className='bg-red-500 py-1 px-2 rounded-xl' onClick={()=>deleteProduct(props.product.productId)}>Delete</button>
                    <Link  className='bg-gray-500 py-1 px-2 rounded-xl' to={`/EditeProduct/${props.product.productId}`}>Edite</Link>
                  </div>
              </div>
           
    
  )
}

export default CraftsmanProducts