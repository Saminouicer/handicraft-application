import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./Auth";
import axios from "axios";
import "../App.css";
import CraftsmanProducts from "./CraftsmanProducts";
import AddProduct from "./AddProduct";

function CraftsmanProfile() {


  const Auth = useAuth();
  const [toggleState, setToggleState] = useState(1);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      if (Auth.user && Auth.user.userId) {
        const res = await axios.get(
          `http://localhost:8080/products/${Auth.user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${Auth.jwt}`,
            },
          }
        );
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };


  // const countSales=()=> {
  //   Auth.user.products.map((product)=> {
  //     return product
  //   })
  // }


  useEffect(() => {
    loadProducts();
  }, [Auth]);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const deleteOrder = async (orderId) => {
    await axios.delete(`http://localhost:8080/ord/${orderId}`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    loadProducts();
  };

  const acceptOrder = async (orderId) => {
    await axios.post(`http://localhost:8080/ord/stat/${orderId}`,{}, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    loadProducts();
  };

  return (
    <div>
      <div className="description p-4 flex items-center  place-content-between relative">
        <div className="flex items-center place-content-between flex-1">
          <div className="profile big-p mr-7 text-center"></div>
          <div className="flex-1">
            <p className="font-bold ">{Auth?.user?.userName}</p>
            <div>Description</div>
            <div>5 star</div>
          </div>
        </div>
        <div className="flex-1 statistics flex justify-center">
          <div className="stat">
            <span>{products.length}</span>
            <div>products</div>
          </div>
          <div className="stat">
            <span>10</span>
            <div>followers</div>
          </div>
          <div className="stat">
            <span>4</span>
            <div>sales</div>
          </div>
        </div>
        <button className="follow absolute">Follow</button>
      </div>
      <div className="flex min-h-screen relative">
        <div className="craftsman sidebare  text-center pt-10 ">
          <div className="sidecontent w-full">
            <div
              className={toggleState === 1 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Items
            </div>
            <div
              className={toggleState === 5 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(5)}
            >
              Add Product
            </div>
            <div
              className={toggleState === 4 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              Orders
            </div>
           
            <div
              className={toggleState === 3 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Contact
            </div>
          </div>
        </div>
        <div className="bg-[#eee] flex-1 p-10">
          <div
            className={toggleState === 1 ? "active-content content" : "content"}
          >
            <div className="productContainer  ">
              {products.map((product, index) => {
                return (
                  <CraftsmanProducts
                    key={index}
                    product={product}
                    load={loadProducts}
                  />
                );
              })}
            </div>
          </div>
         
          <div
            className={toggleState === 4 ? "active-content content" : "content"}
          >
            orders
            {products.map((product) => {
              return product.orders.map((order) => {
                return (
                  <div className="flex  justify-between m-8 bg-white p-3 rounded-xl">
                    <div className="flex">
                      <div className="mr-8">
                        <b>Product Name:</b> {product.name}
                      </div>
                      <div>
                        <b>Quantity:</b> {order.quantity}
                      </div>
                   
                    </div>
                    <div className="flex ">
                      <button onClick={()=> {deleteOrder(order.orderId)}} className=" mr-5 text-white bg-red-600 px-2 py-1 rounded-xl">Delete</button>

                      <button
                      disabled={order.status==="Accepted"}
                       onClick={()=> {acceptOrder(order.orderId)}}
                        className={`mr-5 text-white  px-2 py-1 rounded-xl ${order.status==="Accepted"?("bg-green-400"):("bg-green-600")}`}>
                          Accept
                          </button>

                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div
            className={toggleState === 3 ? "active-content content" : "content"}
          >
            content3
          </div>
          <div
            className={toggleState === 5 ? "active-content content" : "content"}
          >
            <AddProduct />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CraftsmanProfile;
