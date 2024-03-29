import { useLocation } from "react-router-dom";
import ScrollTopButton from "./ScrollTopButton";
import { useLogo } from "../hooks";

const Footer = () => {
  const { configSetting } = useLogo();
  const location = useLocation();

  // hide Footer when current path is admin/*
  const hideFooter = /^\/admin(\/|$)/.test(location.pathname);

  return (
    <>
      {!hideFooter && (
        <footer className="absolute left-0 w-full -bottom-32 bg-slate-600">
          <div className="flex items-center justify-center h-28 md:h-32">
            <h1 className="tracking-wider text-center text-white md:text-xl text">
              Created by{" "}
              <a
                href={configSetting.href}
                target="_blank"
                className="hover:underline"
              >
                {configSetting.footerText}
              </a>
            </h1>
            <ScrollTopButton />
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
