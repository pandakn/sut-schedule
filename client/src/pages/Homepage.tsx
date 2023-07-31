import Blog from "./blog/Blog";
import HeroSection from "../components/HeroSection";

const Homepage = () => {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <Blog />
    </div>
  );
};

export default Homepage;
