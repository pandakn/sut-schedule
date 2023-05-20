import React, { createContext, useEffect, useState } from "react";
import { login } from "../services/httpClient";

interface AccessTokenPayload {
  id: string;
  username: string;
}

type AuthContextType = {
  handleSubmit: (
    event: React.FormEvent,
    username: string,
    password: string
  ) => Promise<void>;
  accessToken: string | null;
  payload: AccessTokenPayload;
  // logout: () => void;
};

const initialAuthContext: AuthContextType = {
  handleSubmit: () => {
    throw new Error("handleSubmit is not implemented");
  },
  accessToken: localStorage.getItem("accessToken"),
  payload: { id: "", username: "" },
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [payload, setPayload] = useState<AccessTokenPayload>({
    id: "",
    username: "",
  });

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const handleSubmit = async (
    event: React.FormEvent,
    username: string,
    password: string
  ) => {
    event.preventDefault();
    const res = await login(username, password);

    const { accessToken, accessPayload } = res;
    if (res) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("payload", JSON.stringify(accessPayload));
      setAccessToken(accessToken);
      setPayload(accessPayload);
    }
  };

  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");
    const accessPayload = localStorage.getItem("payload");

    if (accessPayload) {
      // setAccessToken(accessToken);
      setPayload(JSON.parse(accessPayload));
    }
  }, [accessToken]);

  const authContextValue: AuthContextType = {
    handleSubmit,
    accessToken,
    payload,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
