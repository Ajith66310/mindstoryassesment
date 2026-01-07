import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loader from "./Loader";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/products`
      );
      setProducts(res.data.slice().reverse());
    } catch (err) {
      console.error("Failed to fetch latest products", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();

  const handleFocus = () => {
    fetchProducts();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };
}, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Latest Products</h2>
          <p className="text-gray-500 mt-1">Our newest arrivals just for you</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.slice(0, 10).map((product) => (
          <ProductItem
            key={product._id || product.id}
            id={product._id || product.id}
            title={product.title}
            img={product.images?.[0]}
            price={product.price}
            percentage={20}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;