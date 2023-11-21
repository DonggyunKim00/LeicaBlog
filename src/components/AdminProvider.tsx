import React, { createContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const adminKey = secureLocalStorage.getItem("adminKey");
    setIsAdmin("kimyounggil" === adminKey);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
