import React, { createContext, useEffect, useState } from "react";
import { login, register } from "../services/httpClient";

interface AuthMsg {
  message: string;
  error: boolean;
}

interface AccessTokenPayload {
  id: string;
  name: string;
  username: string;
}

type AuthContextType = {
  handleRegister: (
    name: string,
    username: string,
    password: string
  ) => Promise<void>;
  handleLogin: (username: string, password: string) => Promise<void>;
  accessToken: string | null;
  payload: AccessTokenPayload;
  loggedIn: AuthMsg;
  registered: AuthMsg;
  showAlert: boolean;
};

const initialAuthContext: AuthContextType = {
  handleRegister: () => {
    throw new Error("handleRegister is not implemented");
  },
  handleLogin: () => {
    throw new Error("handleLogin is not implemented");
  },
  accessToken: localStorage.getItem("accessToken"),
  payload: { id: "", name: "", username: "" },
  loggedIn: { message: "", error: false },
  registered: { message: "", error: false },
  showAlert: false,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [payload, setPayload] = useState<AccessTokenPayload>({
    id: "",
    name: "",
    username: "",
  });

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loggedIn, setLoggedIn] = useState<AuthMsg>({
    message: "",
    error: false,
  });
  const [registered, setRegistered] = useState<AuthMsg>({
    message: "",
    error: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async (
    name: string,
    username: string,
    password: string
  ) => {
    const res = await register(name, username, password);

    const data = res?.data;
    const err = res?.error;

    if (err) {
      setRegistered({ message: data.message, error: err });
    } else {
      setRegistered({ message: data.message, error: false });
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setRegistered({ message: "", error: false });
    }, 1500);
  };

  const handleLogin = async (
    // event: React.FormEvent,
    username: string,
    password: string
  ) => {
    // event.preventDefault();
    const res = await login(username, password);
    const data = res?.data;
    const err = res?.error;

    // console.log("login", data.message, err);

    if (err) {
      setLoggedIn({ message: data.message, error: err });
    } else {
      const { accessToken, accessPayload } = data.result;
      setLoggedIn({ message: data.message, error: false });
      setTimeout(() => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("payload", JSON.stringify(accessPayload));
        setAccessToken(accessToken);
        setPayload(accessPayload);
      }, 1500);
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      // setLoggedIn({ message: "", error: false });
    }, 1500);
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
    handleRegister,
    handleLogin,
    accessToken,
    payload,
    loggedIn,
    registered,
    showAlert,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export type { AuthContextType };
