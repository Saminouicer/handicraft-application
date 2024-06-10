import React from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const Auth = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
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
    const res=await axios.post(
      `http://localhost:8080/product/${Auth.user.userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Auth.jwt}`,
        },
      }
    );
      navigate(`/uploadImage/${res.data.productId}`)
  };

  return (
    <>
      <h1 className="text-center my-6 font-bold">Add Product</h1>
      <div className="flex justify-center mt-8">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

       

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              description
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              price
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              type="text"
              placeholder="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">select product category</option>
              <option value="POTTERY">Pottery</option>
              <option value="CLOTHES">Clothes</option>
              <option value="NECKLACES">Necklaces</option>
              <option value="RUGS">Rugs</option>
              <option value="FURNITURE">Furniture</option>
              <option value="PAINTSART">PaintsArt</option>
            </select>
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
  );
}

export default AddProduct;
