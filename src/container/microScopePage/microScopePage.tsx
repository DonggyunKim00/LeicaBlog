import React from "react";
import ContentsList from "./components/ContentsList";
import MicroContents from "./components/MicroContents";
import CreateContent from "./components/CreateContent";

const MicroScopePage = () => {
  return (
    <div>
      <CreateContent />
      <ContentsList />
      <MicroContents />
    </div>
  );
};

export default MicroScopePage;
