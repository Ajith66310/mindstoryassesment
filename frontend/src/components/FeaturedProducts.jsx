import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./FeaturedProducts.module.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=10");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Featured Products</h2>
          <Link
            to="/allproducts"
            className=" bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            View All
          </Link>
        </div>

        <div className={styles.titleUnderline}></div>

        {/* PRODUCTS */}
        <div className={styles.swiperWrapper}>
          {products.length > 0 && (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop
              speed={900}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1440: { slidesPerView: 5 },
              }}
              className={styles.swiperContainer}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductItem
                    id={product.id}
                    title={product.title}
                    img={product.thumbnail}
                    price={product.price}
                    percentage={Math.round(product.discountPercentage) || 20}
                    centerTitle={true}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
