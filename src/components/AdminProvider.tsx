import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("access");
    if (refreshToken) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
