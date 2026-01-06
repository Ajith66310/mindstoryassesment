import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import ProductItem from "./ProductItem";
import Loader from "./Loader";
const FeaturedProducts = () => {
const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">FeaturedProducts</h2>
        <Link 
          to="/allproducts" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.slice(0, 10).map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
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

export default FeaturedProducts;