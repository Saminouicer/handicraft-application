import React from "react";
import { useAuth } from "./Auth";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ImageComponant from "./ImageComponant";
import { Link } from "react-router-dom";

function SearchProduct() {
  const Auth = useAuth();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:8080/products`);
    setProducts(result.data);
  };

  useEffect(() => {
    if (Auth ) loadProducts();
  }, [Auth]);
  if (!Auth ) return <div>loading</div>;

  return (
    <div className="bg-[#eee]">
      <div className="  flex flex-wrap m-auto w-[1100px] gap-y-6 gap-x-6  min-h-screen py-8 px-4">
        {products
          .filter((product) => {
            return Auth.filter === product.name || Auth.filter === ""
              ? product
              : "";
          })
          .map((product, index) => {
            return (
              <div className="product  h-fit ">
                <div className="image mb-2">
                  <ImageComponant product={product} />
                </div>
                <div key={index}>{product.name}</div>
                <div className="h-[24px]">{product.description}</div>
                <p className="mb-2 h-[35px]">Category : {product.category}</p>

                <div className="flex justify-between mb-2 text-[#777]">
                  <span>price</span>
                  <span>{product.price}$</span>
                </div>
                <div className="flex justify-between mb-2 text-[#777] text-white">
                  {Auth.info.role === "client" && (
                    <Link
                      to={`/makeOrder/${product.productId}`}
                      className="bg-red-400 rounded-xl p-2"
                    >
                      {" "}
                      By Now
                    </Link>
                  )}
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
  );
}

export default SearchProduct;
