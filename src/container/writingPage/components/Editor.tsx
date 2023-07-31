import React from "react";
import Toolbar from "./Toolbar";
import ContentBox from "./ContentBox";
import { Editor as RawEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";

interface EditorProps {
  editor: RawEditor | null;
}
const Editor = ({ editor }: EditorProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Toolbar editor={editor} handleSubmit={handleSubmit} />
      <ContentBox editor={editor} register={register} />
    </>
  );
};

export default Editor;
