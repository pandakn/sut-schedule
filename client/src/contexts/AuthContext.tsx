import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, register } from "../services/authHttpClient";
import { getUserById } from "../services/httpClient";
import toast from "react-hot-toast";

interface AuthMsg {
  message: string | undefined;
  error: boolean | undefined;
}

interface AccessTokenPayload {
  id: string;
  name: string;
  username: string;
  role: string;
}

type AuthContextType = {
  handleRegister: (
    name: string,
    username: string,
    password: string
  ) => Promise<unknown>;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  accessToken: string | null;
  payload: AccessTokenPayload;
  setPayload: Dispatch<SetStateAction<AccessTokenPayload>>;
  loggedIn: AuthMsg;
  registered: AuthMsg;
};

const initialAuthContext: AuthContextType = {
  handleRegister: () => {
    throw new Error("handleRegister is not implemented");
  },
  handleLogin: () => {
    throw new Error("handleLogin is not implemented");
  },
  handleLogout: () => {
    throw new Error("handleLogout is not implemented");
  },
  accessToken: localStorage.getItem("accessToken"),
  payload: { id: "", name: "", username: "", role: "" },
  setPayload: () => {
    throw new Error("setPayload is not implemented");
  },
  loggedIn: { message: "", error: false },
  registered: { message: "", error: false },
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const redirectAdmin = /^\/admin(\/|$)/.test(location.pathname);
  const [payload, setPayload] = useState<AccessTokenPayload>({
    id: "",
    name: "",
    username: "",
    role: "",
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
  const navigate = useNavigate();

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
      toast.error(data.message, { duration: 2500 });
    } else {
      setRegistered({ message: data.message, error: false });
      toast.success(data.message, { duration: 1500 });
      setTimeout(() => {
        redirectAdmin ? window.location.reload() : navigate("/login");
      }, 1500);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    const res = await login(username, password);
    // const res = await login(username, password);
    const data = res?.data;
    const err = res?.error;

    if (!data?.message) return;

    if (err) {
      setLoggedIn({ message: data?.message, error: err });
      toast.error(data.message, { duration: 1500 });
    } else {
      const result = data?.result;

      if (result && result.accessToken && result.accessPayload) {
        const { accessToken, accessPayload } = result;
        setLoggedIn({ message: data?.message, error: false });
        toast.success(data.message, { duration: 1500 });
        localStorage.setItem("accessToken", accessToken);

        setTimeout(() => {
          setAccessToken(accessToken);
          setPayload(accessPayload);
        }, 1500);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const currentUser = useCallback(async () => {
    if (accessToken) {
      const res = await getUserById(payload.id, accessToken);

      if (res) {
        const { _id, name, username, role } = res.result;
        setPayload({ id: _id, name, username, role });
        localStorage.setItem(
          "payload",
          JSON.stringify({ id: _id, name, username, role })
        );
      }
    }
  }, [accessToken, payload.id]);

  useEffect(() => {
    currentUser();
  }, [currentUser]);

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
    handleLogout,
    accessToken,
    payload,
    setPayload,
    loggedIn,
    registered,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export type { AuthContextType };
