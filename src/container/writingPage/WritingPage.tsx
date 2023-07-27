import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import { useEditor } from "@tiptap/react";
import FontSize from "tiptap-extension-font-size";
import Underline from "@tiptap/extension-underline";
import React from "react";
import Strike from "@tiptap/extension-strike";
import { styled, css } from "styled-components";
import Placeholder from "@tiptap/extension-placeholder";
import Editor from "./components/Editor";

const WritingPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      TextStyle,
      FontFamily,
      Color,
      FontSize,
      Underline,
      Strike,
    ],
    content: "",
  });
  return (
    <Container>
      <Editor editor={editor} />
    </Container>
  );
};

export default WritingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999999;

  .ProseMirror {
    min-height: 2000px;
    padding: 80px 60px;
    font-size: 16px;
    background-color: white;
    color: #252525;
    margin-top: 10px;
    h1,
    h2,
    h3,
    p {
      font-weight: normal;
      margin: 0;
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.25em;
    }
  }

  .ProseMirror:focus {
    outline: none;
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
