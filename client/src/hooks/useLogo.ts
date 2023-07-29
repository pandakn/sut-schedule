import { useContext } from "react";
import {
  ConfigLogoContext,
  ConfigLogoContextType,
} from "../contexts/ConfigLogoContext";

export const useLogo = (): ConfigLogoContextType =>
  useContext(ConfigLogoContext);
