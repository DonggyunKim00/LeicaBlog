import { decrypt } from "@/utils/crypto";
import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  isAdmin: false,
});

export const AdminProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const encryptedValue = sessionStorage.getItem("nts-microscope");
    if (encryptedValue) {
      const sessionValue = decrypt(encryptedValue);
      setIsAdmin("Nts-Leica-Login" === sessionValue);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};
