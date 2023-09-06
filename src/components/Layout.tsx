import React from "react";
import Footer from "./Footer";
import Search from "./Search";
import Header from "./Top";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <Search />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
