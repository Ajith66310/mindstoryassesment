import React, { useState } from "react"; 
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductItem = ({ id, title, img, price, percentage, btnText }) => {

  const [isLiked, setIsLiked] = useState(false);

  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(String(percentage).replace("%", "")) || 0;
  const offerPrice = Math.round(numericPrice - (numericPrice * numericDiscount) / 100);
  const btn = btnText === "View" ? "View" : "Add to Cart";


  const handleLikeToggle = (e) => {
    e.stopPropagation(); 
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl 
                 transition-all duration-500 bg-white border border-gray-100 font-[Poppins]"
    >

      <button
        onClick={handleLikeToggle} 
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 
                   text-xl shadow-md hover:scale-110 hover:bg-white transition-all duration-300"
      >
      
        {isLiked ? (
          <FaHeart className="text-red-600 transition-colors duration-300" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300" />
        )}
      </button>

      {/* Product Image */}
      <div className="relative w-full aspect-3/4 overflow-hidden rounded-t-2xl">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4 pt-2">
        <p className={`text-lg md:text-xl font-semibold font-[Playfair_Display] text-black leading-tight truncate`}>
          {title}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-gray-400 line-through text-sm md:text-base">
            ₹{Math.round(numericPrice)}
          </p>
          <p className="text-lg md:text-xl font-bold text-gray-900">₹{offerPrice}</p>
          <span className="text-red-600 text-xs font-medium">-{numericDiscount}%</span>
        </div>

        <button
          className="mt-3 w-full py-2 md:py-2.5 rounded-xl bg-linear-to-r bg-red-600 
                     text-white font-semibold tracking-wide shadow-sm 
                     hover:from-gray-900 hover:to-gray-800 hover:shadow-md transition-all duration-600"
        >
          {btn}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;