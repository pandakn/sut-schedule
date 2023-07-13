import React, { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks";

// services
import { getAllUsers } from "../services/httpClientForAdmin";

// types
import { Users } from "../components/admin/@types/user";

type UserContextType = {
  usersInfo: Users[];
  totalUser: number;
};

const initialAuthContext: UserContextType = {
  usersInfo: [],
  totalUser: 0,
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>(initialAuthContext);

const UserProvider = ({ children }: UserProviderProps) => {
  const { accessToken } = useAuth();
  const [usersInfo, setUsersInfo] = useState<Users[]>([]);
  const [totalUser, setTotalUser] = useState(0);

  const fetchAllUsers = useCallback(async () => {
    if (accessToken) {
      const res = await getAllUsers(accessToken);

      if (res) {
        const data = res.result;
        setUsersInfo(data);
        setTotalUser(data.length);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const userContextValue: UserContextType = {
    usersInfo,
    totalUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

export type { UserContextType };
