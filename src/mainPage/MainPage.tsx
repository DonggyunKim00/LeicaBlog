import React from "react";
import Top from "./components/Top";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Contents from "./components/Contents";
import Service from "./components/Service";
import Inquiry from "./components/Inquiry";

const MainPage = () => {
  return (
    <div>
     
      <Top />
      {/* <Inquiry /> */}
      <Search />
      <Contents />
      <Footer />
    </div>
  );
};

export default MainPage;
