import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "../../pages/api/userInfo";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem("access")) {
      const userRole = async () => {
        const res = await getUserInfo();
        if (res.data === "ADMIN") {
          setIsAdmin(true);
        }
      };
      userRole();
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
