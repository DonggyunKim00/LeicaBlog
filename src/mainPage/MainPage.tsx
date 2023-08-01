import React from "react";
import Top from "./components/Top";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Contents from "./components/Contents";
import Service from "./components/Service";

const MainPage = () => {
  return (
    <div>
      <Service />
      <Top />
      <Search />
      <Contents />
      <Footer />
    </div>
  );
};

export default MainPage;
