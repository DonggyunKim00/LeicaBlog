import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AdminProvider } from "./AdminProvider";
import Footer from "./Footer";
import Search from "./Search";
import Header from "./Top";

const Layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  // 라우팅에 따른 스크롤
  useEffect(() => {
    if (router.asPath == "/") {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 900);
    }
  }, [router]);
  return (
    <>
      <AdminProvider>
        <Header />
        <Search />
        {children}
        <Footer />
      </AdminProvider>
    </>
  );
};

export default Layout;
