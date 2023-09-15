import React from "react";
import SubCategoryList from "./components/SubCategoryList"
import MicroContents from "./components/MicroContents";
import CreateContent from "./components/CreateContent";

const MicroScopePage = () => {
  return (
    <div>
      <CreateContent />
      <SubCategoryList />
      <MicroContents />
    </div>
  );
};

export default MicroScopePage;
