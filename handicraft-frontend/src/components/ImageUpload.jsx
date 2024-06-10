// src/ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './Auth';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const Auth=useAuth()
    const {productId}=useParams()
    const navigate=useNavigate()

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(`http://localhost:8080/image/${productId}`, formData, {
                headers: {
                  Authorization: `Bearer ${Auth.jwt}`,
                },
              });
            setUploadStatus(response.data);
            navigate("/CraftsmanProfile")
        } catch (error) {
            setUploadStatus('Failed to upload image.');
            console.error('Error uploading image:', error);
        }
    };


 

    return (
       <>
        <div className='flex justify-center '>
           <div className='rounded-xl w-[600px] p-8 m-8 bg-[#eee]'>
           <h2 className='text-center'><b>Upload an Image</b></h2>
            <form onSubmit={handleSubmit}>
                <input className='my-4' type="file" onChange={handleFileChange} />

                <button className='block bg-blue-400 text-white rounded-xl px-2 py-1 mx-auto my4'
                 type="submit">
                    Upload
                    </button>

            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
           </div>
        </div>


</>

    );
};

export default ImageUpload;
