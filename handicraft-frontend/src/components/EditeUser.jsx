import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useState, useEffect } from "react";

function EditeUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const Auth = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });

    setFormData(result.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    navigate("/AdminProfile");
  };

  useEffect(() => {
     if (Auth && Auth.jwt) loadUser();
  }, [Auth]);

  if (!Auth || !Auth.jwt) return <div>loading</div>

  return (
    <>
      <h1 className="text-center my-6 font-bold">Edit User</h1>
      <div className="flex justify-center mt-8">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              userName
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              placeholder="userName"
              name="userName"
              value={formData.userName}
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
            {/* <p className='text-red-500'>{errorMessage}</p> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default EditeUser;
