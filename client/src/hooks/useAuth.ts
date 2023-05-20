import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

export const useAuth = (): AuthContextType => useContext(AuthContext);
