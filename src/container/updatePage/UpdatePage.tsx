import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "../writingPage/style.module";
import { useEditor } from "@tiptap/react";
import Editor from "../writingPage/components/Editor";
import { extension } from "@/utils/editorExtension";
import { Editor as EditorTiptap } from "@tiptap/core";
import { useIsUpdateBoard } from "@/hooks/boardHook/useBoard";

const UpdatePage = () => {
  const router = useRouter();
  const boardId = Number(router.query.id);
  const { post } = useIsUpdateBoard(boardId);

  const [context, setContext] = useState<any>(null);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    const editorContent = post && post.content && JSON.parse(post.content);
    setContext(editorContent);
  }, [post]);

  // useEditor를 사용하면 useEffect 안쪽으로 넣을수없음 => 따라서 new 연산자 사용하여 Editor 생성 후 state에 할당
  useEffect(() => {
    if (context) {
      const editor = new EditorTiptap({
        extensions: extension,
        content: context,
      });
      setEditor(editor);
    }
  }, [context]);

  return (
    <Container>
      <Editor editor={editor}></Editor>
    </Container>
  );
};

export default UpdatePage;
