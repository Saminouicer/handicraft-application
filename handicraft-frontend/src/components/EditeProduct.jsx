import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Auth";

function EditeProduct() {
  const { productId } = useParams();

  const navigate = useNavigate();
  const Auth = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const loadProduct = async () => {
    const result = await axios.get(
      `http://localhost:8080/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${Auth.jwt}`,
        },
      }
    );
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
    await axios.put(`http://localhost:8080/product/${productId}`, formData, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    navigate("/CraftsmanProfile");
  };

  useEffect(() => {
    if (Auth && Auth.jwt) loadProduct();
  }, [Auth]);
  if (!Auth || !Auth.jwt) return <h1>laoding</h1>;

  return (
    <>
      <h1 className="text-center my-6 font-bold">Edit Product</h1>
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
            {/* <p className='text-red-500'>{errorMessage}</p> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default EditeProduct;
