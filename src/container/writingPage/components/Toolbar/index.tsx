import React from "react";
import ToolbarBtn from "./ToolbarBtn";
import { Editor } from "@tiptap/react";
import styled, { css } from "styled-components";
import {
  BsTypeBold,
  BsTypeUnderline,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsArrowReturnLeft,
  BsArrowReturnRight,
} from "react-icons/bs";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import ToolbarSelector from "./ToolbarSelector";
import { ToolBarDivider } from "./ToolbarDivider";

export interface ToolBarProps {
  editor?: Editor | null;
}

const index = ({ editor }: ToolBarProps) => {
  return (
    <Container>
      <SubmitLine>
        <button type="button" onClick={() => console.log(editor?.getJSON())}>
          발행하기
        </button>
      </SubmitLine>
      <ExtraLine>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList")}
        >
          bullet list
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          isActive={editor?.isActive("orderedList")}
        >
          order list
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          isActive={editor?.isActive("blockquote")}
        >
          blockquote
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor?.isActive("heading", { level: 1 })}
        >
          h1
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor?.isActive("heading", { level: 2 })}
        >
          h2
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor?.isActive("heading", { level: 3 })}
        >
          h3
        </ToolbarBtn>
      </ExtraLine>
      <TextLine>
        {/* 텍스트 스타일 버튼 */}
        <ToolbarSelector
          optionArr={[
            { value: "", label: "fontSize" },
            { value: "13px" },
            { value: "16px" },
            { value: "19px" },
            { value: "24px" },
            { value: "28px" },
            { value: "30px" },
            { value: "32px" },
            { value: "34px" },
          ]}
          command={(value) => editor?.chain().focus().setFontSize(value).run()}
          isActive={(value) =>
            editor?.isActive("textStyle", { fontSize: value })
          }
        />
        <ToolBarDivider />
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          <BsTypeBold size="20" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          <BsTypeItalic size="20" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline")}
        >
          <BsTypeUnderline size="20" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
        >
          <BsTypeStrikethrough size="20" />
        </ToolbarBtn>
        <ToolbarSelector
          optionArr={[
            { value: "", label: "text color" },
            { value: "#999999", label: "Gray" },
            { value: "#ff0010", label: "Red" },
            { value: "#2a55ff", label: "Blue" },
            { value: "#004e6a", label: "DarkBlue" },
          ]}
          command={(value) => editor?.chain().focus().setColor(value).run()}
          isActive={(value) => editor?.isActive("textStyle", { color: value })}
        />
        <ToolBarDivider />
        {/* alignment 버튼 */}
        <ToolbarBtn
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          isActive={editor?.isActive({ textAlign: "left" })}
        >
          <BiAlignLeft size="20" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          isActive={editor?.isActive({ textAlign: "center" })}
        >
          <BiAlignMiddle size="20" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          isActive={editor?.isActive({ textAlign: "right" })}
        >
          <BiAlignRight size="20" />
        </ToolbarBtn>
        <ToolBarDivider />
        {/* 되돌리기 버튼 */}
        <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()}>
          <BsArrowReturnLeft size="20" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()}>
          <BsArrowReturnRight size="20" />
        </ToolbarBtn>
      </TextLine>

      {/* <div>
        
      </div>
      
        ordered list
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        isActive={editor?.isActive("codeBlock")}
      >
        code block
      </ToolbarBtn>*/}
    </Container>
  );
};

export default index;

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: #ffffffe5;
  width: 100%;
`;
const line = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #0000001a;
  padding: 13px 0px;
`;
const SubmitLine = styled.div`
  ${line}
  justify-content: flex-end;
`;
const ExtraLine = styled.div`
  ${line}
`;
const TextLine = styled.div`
  ${line}
`;
