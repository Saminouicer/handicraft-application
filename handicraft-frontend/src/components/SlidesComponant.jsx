import React, { useEffect, useState } from "react";
import img from "../data/Component 1.png";
import img1 from "../data/Zrbiya.png";
import img2 from "../data/Component_25.png";
import img3 from "../data/images.jpg";
import imageSlide from "../data/Component 1.png";
import reductionImage from "../data/Component 32.png";
import reductionImage2 from "../data/Ellipse 45.png";

// import svg1 from "../data/angle-left-solid.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function SlidesComponant() {
  const [currentIndex, SetCurrentIndex] = useState(0);

  const slides = [
    { url: img1, title: "tilte" },
    { url: img2, title: "tilte" },
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    SetCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    SetCurrentIndex(newIndex);
  };

  // useEffect(()=> {
  //     setTimeout(()=> {
  //         goToNext()
  //     },4000)
  // })

  return (
    <>
      {/* {slides.map((slide,index)=> {
           return  <div className={`slideContent ${index===currentIndex?"active":""}`}>
                <img className=' ' src={slide.url} alt="" /> 
               </div>
        })} */}
      <div
        className={`slideContent relative text-white ${
          currentIndex === 0 ? "active" : ""
        }`}
      >
        <img className="slideOne" src={slides[0].url} alt="" />
        <div className="absolute left-[100px] top-[40px] w-[80px] h-[300px]">
          <img
            className="max-h-[100%] w-full slideOne"
            src={imageSlide}
            alt=""
          />
        </div>
        <div className="absolute right-[490px] top-[40px] w-[80px] h-[300px]">
          <img
            className="max-h-[100%] w-full opacity-40 slideOne"
            src={imageSlide}
            alt=""
          />
        </div>
        <div className="absolute right-[100px] bottom-[40px] w-[130px] h-[150px] rotate-90">
          <img
            className="max-h-[100%] w-full opacity-40 slideOne "
            src={imageSlide}
            alt=""
          />
        </div>
        <div className="absolute right-[150px] top-[40px] w-[130px] h-[150px] rotate-90">
          <img
            className="max-h-[100%] w-full opacity-20 slideOne"
            src={imageSlide}
            alt=""
          />
        </div>
        {/* <div className='firstSlideContent'> */}
        <p className="absolute top-[13px] left-[350px] text-xl">
          <b>Area to post best sellers,</b>{" "}
        </p>
        <p className="absolute top-[80px] right-[500px] text-xl">
          <b>Challenges</b>
        </p>
        <p className="absolute top-[200px] left-[380px] text-xl">
          <b>Reductions</b>
        </p>
        <p className="absolute bottom-[80px] text-center w-full text-3xl">
          <b>AND ANYTHING NEW</b>
        </p>
        {/* </div> */}
      </div>
      <div
        className={`slideContent flex  bg-[#1E1E1E] h-full ${
          currentIndex === 1 ? "active" : ""
        }`}
      >
        {/* <img src={slides[1].url} alt="" /> */}
        <div className="w-1/2 flex justify-center items-center ">
          <img className="w-[300px] h-[180px]" src={reductionImage} alt="" />
        </div>
        <div className="w-1/2">
          <div className="flex justify-end mr-8 mt-8">
            <div className="flex relative justify-center items-center w-[110px]">
              <img className=" " src={reductionImage2} alt="" />
              <p className="text-5xl text-white  absolute">
                <b>-25%</b>
              </p>
            </div>
          </div>
          <p className="text-white text-xl mb-8">
            Reductions on carpets of all sizes
          </p>
          <p className="text-white text-xl ml-[30%] mb-8">
            At the bni mzab store
          </p>
          <p className="text-white text-3xl ml-[10%]">Come pick yours!!</p>
        </div>
      </div>
      

      <div className="slideIcon relative flex justify-between w-full">
        <button
          onClick={() => {
            goToPrevious();
          }}
        >
          <FontAwesomeIcon className=" left" icon={faAngleLeft} />
        </button>

        <button
          onClick={() => {
            goToNext();
          }}
        >
          <FontAwesomeIcon className=" right" icon={faAngleRight} />
        </button>
      </div>
    </>
  );
}

export default SlidesComponant;
