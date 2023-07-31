import { BsArrowRight } from "react-icons/bs";
import Hero from "/images/7 SCENE.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="container mx-auto mt-8 rounded-lg ">
      <div className="flex flex-col items-center p-10 mx-5 rounded-3xl md:flex-row">
        <div className="md:w-1/2">
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
            Welcome to <br />
            <p className="mt-2">
              <span className="mr-4 text-orange-400">SUT</span>
              Schedule
            </p>
          </h1>
          <p className="mb-4 lg:text-lg">
            Unlock Your Academic Potential: The Ultimate Web App for SUT
            Students to Dope-ly Plan Class Schedules & Ace Every Semester!
          </p>
          <button className="px-4 py-2 mt-4 font-bold text-white bg-orange-500 rounded gap-x-2 hover:bg-orange-600">
            <Link to="/schedule" className="flex items-center">
              Get Started <BsArrowRight className="w-5 h-5" />
            </Link>
          </button>
        </div>
        <div className="md:ml-20 md:w-3/4">
          <img src={Hero} alt="Hero Image" className="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
