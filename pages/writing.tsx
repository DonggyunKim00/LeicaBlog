import { FileLoadingProvider } from "@/components/FileLoadingProvider";
import React from "react";
import WritingPage from "../src/container/writingPage/WritingPage";
const writing = () => {
  return (
    <FileLoadingProvider>
      <WritingPage />
    </FileLoadingProvider>
  );
};

export default writing;
