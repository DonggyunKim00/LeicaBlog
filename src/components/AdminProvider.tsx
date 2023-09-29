import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvide: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const adminKey = secureLocalStorage.getItem("adminKey");
    setIsAdmin("kimyounggil" === adminKey);
  }, [router.query.admin]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
