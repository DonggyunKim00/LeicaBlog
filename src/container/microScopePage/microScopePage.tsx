import React, { useContext, useEffect, useState } from "react";
import SubCategoryList from "./components/SubCategoryList";
import MicroContents from "./components/MicroContents";
import CreateContent from "./components/CreateContent";
import { useRouter } from "next/router";
import { AdminContext } from "@/components/AdminProvider";

const MicroScopePage = () => {
  const { isAdmin } = useContext(AdminContext);

  return (
    <div>
      {isAdmin && <CreateContent />}
      <SubCategoryList />
      <MicroContents />
    </div>
  );
};

export default MicroScopePage;
