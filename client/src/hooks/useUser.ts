import { useContext } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";

export const useUser = (): UserContextType => useContext(UserContext);
