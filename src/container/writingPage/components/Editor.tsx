import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import ContentBox from "./ContentBox";
import { Editor as RawEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import Preview from "./Preview";

interface EditorProps {
  editor: RawEditor | null;
}
const Editor = ({ editor }: EditorProps) => {
  const { register, handleSubmit } = useForm();
  const [thumbnailUrl, setThumnailUrl] = useState<string>("");

  return (
    <>
      <Toolbar
        editor={editor}
        handleSubmit={handleSubmit}
        thumbnailUrl={thumbnailUrl}
      />
      <ContentBox
        editor={editor}
        register={register}
        thumbnailUrl={thumbnailUrl}
        setThumnailUrl={setThumnailUrl}
      />
    </>
  );
};

export default Editor;
