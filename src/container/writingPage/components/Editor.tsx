import React from "react";
import Toolbar from "./Toolbar";
import ContentBox from "./ContentBox";
import { ContentBoxProps } from "./ContentBox";

const Editor = ({ editor }: ContentBoxProps) => {
  return (
    <>
      <Toolbar editor={editor} />
      <ContentBox editor={editor} />
    </>
  );
};

export default Editor;
