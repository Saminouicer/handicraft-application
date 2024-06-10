import React, { useEffect } from "react";
import { useState } from "react";
import UsersList from "./UsersList";
import adminProfileImg from "../data/Component_10.png";
import ImageComponant from "./ImageComponant";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";

function AdminProfile() {
  const [toggleState, setToggleState] = useState(1);
  const Auth = useAuth();

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:8080/products`);
    setProducts(result.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:8080/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen relative">
        <div className="admin sidebare min-w-48 text-center pt-10 ">
          <div className="my-5">
            <img src={adminProfileImg} alt="" />
          </div>
          <div className="sidecontent w-full">
            <div
              className={toggleState === 1 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Clients
            </div>
            <div
              className={toggleState === 2 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Craftsmen
            </div>
            <div
              className={toggleState === 3 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Products
            </div>
            <div
              className={toggleState === 4 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              Orders
            </div>
            <div
              className={toggleState === 5 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(5)}
            >
              Challenges
            </div>
          </div>
        </div>
        <div className="bg-[#eee] flex-1 p-10">
          <div
            className={toggleState === 1 ? "active-content content" : "content"}
          >
            <div className="usersList bg-white pt-2 rounded-lg">
              <UsersList role="client" />
            </div>
          </div>
          <div
            className={toggleState === 2 ? "active-content content" : "content"}
          >
            <div className="usersList bg-white pt-2 rounded-lg">
              <UsersList role="craftsMan" />
            </div>
          </div>
          <div
            className={toggleState === 3 ? "flex active-content content " : "content flex"}
          >
            {products.map((product) => {
              return (
                <div className="product">
                  <div className="image mb-2">
                    <ImageComponant product={product} />
                  </div>
                  <h1 className="mb-2 font-bold">{product.name}</h1>
                  <p className="mb-2 h-[35px]">{product.description}</p>
                  <p className="mb-2 h-[35px]">Category : {product.category}</p>
                  <div className="flex justify-between mb-2 text-[#777]">
                    <span>price</span>
                    <span>{product.price}$</span>
                  </div>
                  {/* <button className='w-full text-white block bg-violet-700 rounded-xl p-1'>Purchase</button> */}
                  <div className="w-full flex justify-between px-5 text-white mt-6">
                    <button
                      className="bg-red-500 py-1 px-2 rounded-xl"
                      onClick={() => deleteProduct(product.productId)}
                    >
                      Delete
                    </button>
                    <Link
                      className="bg-gray-500 py-1 px-2 rounded-xl"
                      to={`/EditeProduct/${product.productId}`}
                    >
                      Edite
                    </Link>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div
            className={toggleState === 4 ? "active-content content" : "content"}
          >
            Orders
          </div>
          <div
            className={toggleState === 5 ? "active-content content" : "content"}
          >
            Challenges
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
