import React from "react";
import Top from "../mainPage/components/Top";
import Search from "@/mainPage/components/Search";
import Footer from "@/mainPage/components/Footer";
import ContentsList from "@/microScopePage/components/ContentsList";
import Content from "./components/Content";
const DetailPostPage = () => {
  return (
    <>
      <Top />
      <Search />
      <ContentsList />
      <Content />
      <Footer />
    </>
  );
};

export default DetailPostPage;
