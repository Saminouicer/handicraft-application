import React from "react";
import { useAuth } from "./Auth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import img from "../data/Component_10.png";
import "../App.css";
import EditeUser from "./EditeUser";
import UserEditeUser from "./UserEditeUser";
import ClientOrders from "./ClientOrders";

function ClientProfile() {
  const Auth = useAuth();
  const [toggleState, setToggleState] = useState(1);
  const [favorites, setFavorites] = useState([]);
  

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const loadFavorites = async () => {
  //   const result = await axios.get(
  //     `http://localhost:8080/fav/${Auth.user.userId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${Auth.jwt}`,
  //       },
  //     }
  //   );
  //   setFavorites(result.data);
  // };

  // useEffect(()=> {
  //   loadFavorites()
  // },[])

  
  

  return (
    <div>
      <div className="description p-4 flex items-center  place-content-between relative">
        <div className="flex items-center place-content-between flex-1">
          <div className="profile big-p mr-7 text-center"></div>
          <div className="flex-1">
            <p className="font-bold ">{Auth?.user?.userName}</p>
            <div>Description</div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen relative">
        <div className="craftsman sidebare  text-center pt-10 ">
          <div className="sidecontent w-full">
            <div
              className={toggleState === 1 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Favorites
            </div>
            <div
              className={toggleState === 2 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Orders
            </div>
            <div
              className={toggleState === 3 ? "active-tab tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Account
            </div>
          </div>
        </div>
        <div className="bg-[#eee] flex-1 p-10">
          <div
            className={
              toggleState === 1 ? "active-content content" : "content "
            }
          >
            <div className=" productContainer ">

              {/* {favorites.map((fav)=> {
                return <div className="product ">
                <div className="image mb-2">
                  <img src={img} alt="images !" />
                </div>
                <h1 className="mb-2 font-bold">{fav.productF.name}</h1>
                <p className="mb-2 h-[35px]">{fav.productF.description}</p>
                <div className="flex justify-between mb-2 text-[#777]">
                  <span>price</span>
                  <span>{fav.productF.price}$</span>
                </div>
              </div>
              })} */}

              
            </div>
          </div>
          <div
            className={
              toggleState === 2 ? "active-content content " : "content"
            }
          >
            <div className="productContainer">
              <ClientOrders />
            </div>
          </div>
          <div
            className={toggleState === 3 ? "active-content content" : "content"}
          >
            {/* <EditeUser userId={Auth.user.userId}/> */}
            <UserEditeUser />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
