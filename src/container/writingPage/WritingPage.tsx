import React from "react";
import { Container } from "./style.module";
import { useEditor } from "@tiptap/react";
import Editor from "./components/Editor";
import { extension } from "@/utils/editorExtension";

const WritingPage = () => {
  const editor = useEditor({
    extensions: extension,
    content: "",
  });

  return (
    <Container>
      <Editor editor={editor} />
    </Container>
  );
};

export default WritingPage;
