import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Auth";
import axios from "axios";
import ImageComponant from "./ImageComponant";


function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Auth = useAuth();
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    comment:""
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
    setIsSubmitting(true);
    try{
        const res=await axios.post(
            `http://localhost:8080/review/${Auth.user.userId}/${productId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${Auth.jwt}`,
              },
            }
          );
          setFormData({comment:""})

    }catch {
        setIsSubmitting(true);

    }finally {
        setIsSubmitting(false);
        navigate(0)

    }
  };

  const loadProduct = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/product/${productId}`
      );
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading product", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadReviews = async () => {
    // try {
    const result = await axios.get(
      `http://localhost:8080/review/${productId}`
    );
    setReviews(result.data);
    // }
    // catch (error) {
    //     console.error("Error loading product", error);
    // } finally {
    //     setIsLoading(false);
    // }
  };

  useEffect(() => {
    if (Auth ) {
      loadProduct();
      loadReviews();
    } else {
      setIsLoading(false);
    }
  }, [Auth, productId]);


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <div className="flex mb-8">
            <div className="w-1/2 h-[500px]">
              <ImageComponant product={product} />
            </div>
            <div className="w-1/2 p-8 bg-[#eee]">
              <h1 className="text-center mb-8">
                <b>Product Details</b>
              </h1>
              <div className="mb-4">
                <span className="mr-3">
                  <b> Name:</b>
                </span>{" "}
                <span>{product.name}</span>
              </div>
              <div className="mb-4">
                <span className="mr-3">
                  <b>Description:</b>
                </span>{" "}
                <span>{product.description}</span>
              </div>
              <div className="mb-4">
                <span className="mr-3">
                  <b>Price:</b>
                </span>{" "}
                <span>{product.price}$</span>
              </div>
              <div className="mb-4">
                <span className="mr-3">
                  <b>Category:</b>
                </span>{" "}
                <span>{product.category}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#eee] p-8">
            <h1 className="text-center mb-4 ">
              <b>Reviews</b>
            </h1>
            
          {Auth.info.role==="client"&&(
            <div className="mb-4">
            <div className="flex justify-center mt-8">
              <form className="w-full max-w-md" onSubmit={handleSubmit}>
                
               <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="comment"
                  >
                    comment
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="comment"
                    type="text"
                    placeholder="Comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#F88D2F] hover:bg-[#e78a39] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  {/* <p className='text-red-500'>{errorMessage}</p> */}
                </div>
              </form>
            </div>
          </div>
          )}
            
                <div className="min-h-[500px]">
              {reviews.map((review, index) => {
                return (
                  <div className="bg-white mb-4 p-4 rounded-xl">
                    {review.comment}
                  </div>
                );
              })}
            </div>
              
        
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetails;
