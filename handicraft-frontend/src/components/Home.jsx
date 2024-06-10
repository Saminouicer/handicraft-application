import React from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../data/Component_10.png";
import ImageComponant from "./ImageComponant";
import SlidesComponant from "./SlidesComponant";
import icon1 from "../data/image 35.png";
import icon2 from "../data/image 36.png";
import icon3 from "../data/image 37.png";
import icon4 from "../data/image 38.png";
import icon5 from "../data/image 39.png";
import icon6 from "../data/image 40.png";
import Footer from "./Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const Auth = useAuth();
  const filters = [
    { image: icon1, type: "POTTERY" },
    { image: icon2, type: "CLOTHES" },
    { image: icon3, type: "NECKLACES" },
    { image: icon4, type: "RUGS" },
    { image: icon5, type: "FURNITURE" },
    { image: icon6, type: "PAINTSART" },
  ];

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:8080/products`);
    setProducts(result.data);
  };

  // const addToFavorite=async(productId)=> {
  //    await axios.post(`http://localhost:8080/fav/${Auth.user.userId}/${productId}`,{}, {
  //     headers: {
  //       Authorization: `Bearer ${Auth.jwt}`,
  //     },
  //   });
  //   loadProducts()
  // }


  useEffect(() => {
    if (Auth ) loadProducts();
  }, [Auth]);
  if (!Auth && !Auth.jwt && !Auth.user) return <div>loading</div>;

  return (
    <>
      <div className=" slideContainer ">
        <SlidesComponant />
      </div>

      <div className="filterProducts">
        {filters.map((filter, index) => {
          return (
            <div>
              <button
              onClick={() => {
                setFilter(filter.type);
              }}
            >
              <img src={filter.image} alt="" />
            </button>
            <h1 className="text-white text-center">{filter.type}</h1>
            </div>
          );
        })}
      </div>

      <div className="bg-[#eee]">
      <div className="  flex flex-wrap m-auto w-[1100px] gap-y-6 gap-x-6  min-h-screen py-8 px-4">
        {products
          .filter((product) => {
            return filter === product.category || filter === "" ? product : "";
          })
          .map((product, index) => {
            return (
              <div className="product  h-fit ">
                <div className="image mb-2">
                  <ImageComponant product={product} />
                </div>
                <div key={index}>{product.name}</div>
                <div className="h-[24px]">{product.description}</div>
                {/* <p className="mb-2 h-[35px]">Category : {product.category}</p> */}

                <div className="flex justify-between mb-2 text-[#777]">
                  <span>price</span>
                  <span>{product.price}$</span>
                </div>
                <div className="flex justify-between mb-2 text-[#777] text-white">
                 {
                  Auth.info.role==="client"&&(
                    <Link
                    to={`/makeOrder/${product.productId}`}
                    className="bg-red-400 rounded-xl p-2"
                  >
                    {" "}
                    By Now
                  </Link>
                  )
                 }
                  <Link
                    to={`/productDetails/${product.productId}`}
                    className="bg-blue-500 rounded-xl p-2"
                  >
                  View
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
