import Blog from "./blog/Blog";
import HeroSection from "../components/HeroSection";

const Homepage = () => {
  return (
    <div className="container px-5 mx-auto">
      <HeroSection />
      <Blog />
    </div>
  );
};

export default Homepage;
