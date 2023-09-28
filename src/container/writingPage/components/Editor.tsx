import React, { useState } from "react";
import Toolbar from "./Toolbar";
import ContentBox from "./ContentBox";
import { Editor as RawEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";

interface EditorProps {
  editor: RawEditor | null;
}
const Editor = ({ editor }: EditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  // writingPage 자체 헤더툴바에서 보여지기위한 url state
  const [thumbnailUrl, setThumnailUrl] = useState<string>("");
  // update페이지에서 초기 렌더링을 위한 thumbnail url
  const [preRenderThumbnail, setPreRenderThumbnail] = useState<string>("");

  return (
    <>
      <Toolbar
        editor={editor}
        handleSubmit={handleSubmit}
        thumbnailUrl={thumbnailUrl}
        preRenderThumbnail={preRenderThumbnail}
      />
      <ContentBox
        editor={editor}
        register={register}
        errors={errors}
        thumbnailUrl={thumbnailUrl}
        setThumnailUrl={setThumnailUrl}
        setValue={setValue}
        preRenderThumbnail={preRenderThumbnail}
        setPreRenderThumbnail={setPreRenderThumbnail}
      />
    </>
  );
};

export default Editor;
