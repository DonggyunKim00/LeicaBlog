import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../pages/api/userInfo";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { data } = useQuery(["isAdmin"], () => getUserInfo(), {});

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data) {
      setIsAdmin(data.data === "ADMIN");
    }
  }, [data]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
