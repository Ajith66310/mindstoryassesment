import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=30");
        setProducts(res.data.products); 
      } catch (err) {
        console.error("Error fetching all products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition group"
      >
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-gray-900">
            All Products
          </h1>
          <div className="h-1 w-12 bg-green-500 mt-2 rounded"></div>
        </div>
        <p className="text-gray-500 font-medium bg-gray-100 px-4 py-1 rounded-full text-sm">
          {products.length} Items found
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            img={product.thumbnail || product.images?.[0]}
            price={product.price}
            percentage={Math.round(product.discountPercentage) || 20}
            textColor="black"
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default AllProducts;