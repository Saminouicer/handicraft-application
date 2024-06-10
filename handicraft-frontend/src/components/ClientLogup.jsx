import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { useState } from 'react';
import axios from 'axios';

function ClientLogup() {
  const Auth=useAuth();

    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName:'',
        email:'',
        dateOfBirth:'',
        age:'',
        password:''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
              ...formData,
              [name]: value,
            });
          };

          const handleSubmit =async (e) => {
            e.preventDefault();
                    await axios.post(`http://localhost:8080/user/client`,formData
              )
            navigate('/login');
            }

  return (
    <div>
        <h1 className='text-center my-6 font-bold'>Create Client Profile</h1>
        <div className="flex justify-center mt-8">
          <form className="w-full max-w-md mb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              email
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              dateOfBirth
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateOfBirth"
                type="date"
                placeholder="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              age
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="number"
                placeholder="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              userName
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                password
              </label>
              <input
              required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
          
            <div className="flex items-center justify-between">
             
              <button
                className="block bg-[#F88D2F] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              {/* <p className='text-red-500'>{errorMessage}</p> */}
            </div>
          </form>
        </div>

    </div>
  )
}

export default ClientLogup