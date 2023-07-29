import { Link } from "react-router-dom";
import { useLogo } from "../hooks";

export interface ILogo {
  href: string;
  logo: string;
}

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Logo = () => {
  const { configLogo } = useLogo();

  return (
    <div className="flex-shrink-0">
      <Link to={configLogo.href}>
        <img src={`${IMAGE_URL}/${configLogo.logo}`} alt="logo" className="" />
      </Link>
    </div>
  );
};

export default Logo;
