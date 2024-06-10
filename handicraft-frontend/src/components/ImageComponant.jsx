import React from 'react'
import { useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';
import { useEffect } from 'react';

function ImageComponant(props) {

    const [imageSrc, setImageSrc] = useState('');
    const Auth=useAuth()


       const loadImage = async () => {
        // if (!fileName) {
        //     alert('Please enter a file name.');
        //     return;
        // }

        try {
          if(props.product.imageData.name) {
            const response = await axios.get(`http://localhost:8080/image/${props.product.imageData.name}`, {
              
              responseType: 'arraybuffer',
            });
          const imageBlob = new Blob([response.data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);
          }
        } catch (error) {
            console.error('Error downloading image:', error);
            setImageSrc('');
            // alert('Failed to download image.');
        }
    };

    useEffect(()=> {
        loadImage()
      },[props.product.imageData])


  return (
    <img className='h-[100%] w-[100%]' src={imageSrc} alt="images !" />
  )
}

export default ImageComponant