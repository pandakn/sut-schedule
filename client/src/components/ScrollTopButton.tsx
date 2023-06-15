import { IoIosArrowUp } from "react-icons/io";

const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute top-4 right-2 sm:right-4 lg:right-8 hover:cursor-pointer hover:opacity-70 text-white/60">
      <div onClick={scrollToTop} className="flex items-center gap-x-2">
        <p className="hidden sm:block">Back to Top</p>
        <IoIosArrowUp className="w-6 h-6 transition duration-100 ease-in-out md:w-8 md:h-8" />
      </div>
    </div>
  );
};

export default ScrollTopButton;
