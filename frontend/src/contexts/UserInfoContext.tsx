import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {UserType} from "../types";
import {getMyUserInfo} from "../api/users/getMyUserInfo";

type UserInfo = {
  id: number,
  email: string,
  type: UserType
} | null;

type UserInfoContextType = {
  userInfo: UserInfo,
  fetchUserInfo: () => void
}

const userInfoContext = createContext<UserInfoContextType>({
  userInfo: null,
  fetchUserInfo: () => {}
});

export const UserInfoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  const fetchUserInfo = useCallback(() => {
    getMyUserInfo().then(data => {
      setUserInfo(data);
    });
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <userInfoContext.Provider value={{ userInfo, fetchUserInfo }}>
      {children}
    </userInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  return useContext(userInfoContext);
};