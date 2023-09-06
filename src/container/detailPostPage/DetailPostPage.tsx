import React from "react";
import Top from "../../components/Top";
import Search from "../../components/Search";
import Footer from "../../components/Footer";
import ContentsList from "@/container/microScopePage/components/ContentsList";
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
