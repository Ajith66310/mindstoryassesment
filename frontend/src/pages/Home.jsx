import { useEffect, useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Landing from "../components/Landing";
import LatestProducts from "../components/LatestProducts";

const Home = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {

    if (isAnimating) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0); 
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAnimating]);

  return (
    <>
      <Landing onAnimationComplete={() => setIsAnimating(false)} />
      <div style={{ visibility: isAnimating ? "hidden" : "visible", opacity: isAnimating ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <LatestProducts />
        <FeaturedProducts />
      </div>
    </>
  );
};

export default Home;