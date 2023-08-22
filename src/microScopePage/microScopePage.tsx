import React from "react";
import Top from "@/mainPage/components/Top";
import Footer from "@/mainPage/components/Footer";
import Search from "@/mainPage/components/Search";
import ContentsList from "./components/ContentsList";
import MicroContents from "./components/MicroContents";
import CreateContent from "./components/CreateContent";

const MicroScopePage = () => {
  return (
    <div>
      <Top />
      <Search />
      <CreateContent />
      <ContentsList />
      <MicroContents />
      <Footer />
    </div>
  );
};

export default MicroScopePage;
