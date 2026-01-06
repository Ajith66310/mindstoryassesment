import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loader from "./Loader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(res.data.slice(0,40));
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[Playfair_Display]">All Products</h1>
        <p className="text-gray-500">{products.length} Items found</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductItem 
            key={product.id} 
            id={product.id}
            title={product.title}
            img={product.images?.[0]} 
            price={product.price}
            percentage={20}
            textColor="black"
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;