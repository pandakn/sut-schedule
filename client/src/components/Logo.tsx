import { Link } from "react-router-dom";
import { useLogo } from "../hooks";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Logo = () => {
  const { configSetting } = useLogo();

  return (
    <div className="flex-shrink-0">
      <Link to="/">
        <img
          src={`${IMAGE_URL}/${configSetting.logo}`}
          alt="logo"
          className=""
        />
      </Link>
    </div>
  );
};

export default Logo;
