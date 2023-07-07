import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="text-xl uppercase">
        <span className="text-orange-500">Sut</span> Schedule
      </Link>
    </div>
  );
};

export default Logo;
