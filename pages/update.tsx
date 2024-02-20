import UpdatePage from "@/container/updatePage/UpdatePage";
import React from "react";
import { FileLoadingProvider } from "@/components/FileLoadingProvider";

const update = () => {
  return (
    <FileLoadingProvider>
      <UpdatePage />
    </FileLoadingProvider>
  );
};

export default update;
