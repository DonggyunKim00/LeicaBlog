import React, { useCallback } from "react";
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
  BsYoutube,
} from "react-icons/bs";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import ToolbarSelector from "./ToolbarSelector";
import { ToolBarDivider } from "./ToolbarDivider";
import { FieldValues } from "react-hook-form";
import ToolbarSelectors from "./ToolbarSelectors";
import { uploadImage } from "../../../../../pages/api/image";
import { postBoard } from "../../../../../pages/api/board";
export interface ToolBarProps {
  editor?: Editor | null;
  handleSubmit: any;
}

const Toolbar = ({ editor, handleSubmit }: ToolBarProps) => {
  const submit = (data: FieldValues) => {
    const title = data.mainFolder;
    const categoryName = data.subFolder;
    const content = editor && editor.getJSON(); // JSON 타입으로 받아야함 -> 백엔드쪽 타입 설정 필요
    console.log(content);
    // console.log(postBoard({ title, categoryName, content }));
  };

  const addYoutubeVideo = () => {
    const url = prompt("유튜브 URL을 입력하세요.");
    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const setLink = useCallback(() => {
    const url = prompt("연결 할 URL을 입력하세요. ex)https://example.com");
    if (url === null) {
      return;
    }
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);
  return (
    <Container>
      <SubmitLine>
        <SubmitBtn
          // type="submit"
          onClick={handleSubmit(submit)}
        >
          발행하기
        </SubmitBtn>
      </SubmitLine>
      <ExtraLine>
        <ToolbarSelectors
          optionArr={[
            { command: () => {}, label: "리스트 선택" },
            {
              command: () => editor?.chain().focus().toggleBulletList1().run(),
              label: "• 리스트",
            },
            {
              command: () => editor?.chain().focus().toggleBulletList2().run(),
              label: "♦ 리스트",
            },
            {
              command: () => editor?.chain().focus().toggleBulletList3().run(),
              label: "✔ 리스트",
            },
            {
              command: () => editor?.chain().focus().toggleOrderedList().run(),
              label: "숫자 리스트",
            },
          ]}
        />
        <ToolBarDivider />
        <ToolbarSelectors
          optionArr={[
            { command: () => {}, label: "인용구 선택" },
            {
              command: () => editor?.chain().focus().toggleBlockquote6().run(),
              label: "진한 인용구",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote7().run(),
              label: "연한 인용구",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote2().run(),
              label: "진한 따옴표",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote1().run(),
              label: "연한 따옴표",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote3().run(),
              label: "모서리 박스",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote4().run(),
              label: "종이 박스",
            },
            {
              command: () => editor?.chain().focus().toggleBlockquote5().run(),
              label: "말풍선",
            },
          ]}
        />
        <ToolBarDivider />
        <ToolbarSelectors
          optionArr={[
            { command: () => {}, label: "구분선 선택" },
            {
              command: () => editor?.chain().focus().setHorizontalRule1().run(),
              label: "기본 구분선",
            },
            {
              command: () => editor?.chain().focus().setHorizontalRule4().run(),
              label: "짧은 기본 구분선",
            },
            {
              command: () => editor?.chain().focus().setHorizontalRule2().run(),
              label: "네모 구분선1",
            },
            {
              command: () => editor?.chain().focus().setHorizontalRule3().run(),
              label: "네모 구분선2",
            },
          ]}
        />
        <ToolBarDivider />
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
        <ToolBarDivider />
        <ToolbarBtn onClick={setLink} isActive={editor?.isActive("link")}>
          http://
        </ToolbarBtn>
        <ToolBarDivider />
        <ToolbarSelector
          optionArr={[
            { value: "", label: "이미지,동영상 삽입" },
            { value: "left" },
            { value: "center" },
            { value: "right" },
          ]}
          command={(value) => {
            const input = document.createElement("input");

            input.type = "file";
            input.multiple = true;
            input.onchange = (_) => {
              if (!input.files) {
                return;
              }

              const files = Array.from(input.files);
              files.forEach(async (file) => {
                const url = await uploadImage({
                  image: file,
                });
                editor
                  ?.chain()
                  .focus()
                  .setImage({ src: url.toString(), id: value })
                  .run();
              });
            };
            input.click();
          }}
        />
        <ToolBarDivider />
        <ToolbarBtn onClick={addYoutubeVideo}>
          <BsYoutube size="20" />
        </ToolbarBtn>
      </ExtraLine>
      <TextLine>
        {/* 텍스트 스타일 버튼 */}
        <ToolbarSelector
          optionArr={[
            { value: "", label: "폰트 설정" },
            { value: "Inter" },
            { value: "Comic Sans" },
            { value: "serif" },
            { value: "monospace" },
            { value: "cursive" },
          ]}
          command={(value) =>
            editor?.chain().focus().setFontFamily(value).run()
          }
        />
        <ToolBarDivider />
        <ToolbarSelector
          optionArr={[
            { value: "16px", label: "글자 크기" },
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
        <ToolBarDivider />
        <ToolbarSelector
          optionArr={[
            { value: "", label: "텍스트 컬러" },
            { value: "#999999", label: "회색" },
            { value: "#ff0010", label: "빨간색" },
            { value: "#2a55ff", label: "파란색" },
            { value: "#0078cb", label: "하늘색" },
            { value: "#00756a", label: "풀색" },
            { value: "#004e6a", label: "청록색" },
          ]}
          command={(value) => editor?.chain().focus().setColor(value).run()}
        />
        <ToolBarDivider />
        <ToolbarSelector
          optionArr={[
            { value: "", label: "텍스트 하이라이트" },
            { value: "#ffe8e2", label: "연빨강" },
            { value: "#f7f7f7", label: "연회색" },
            { value: "#2a55ff", label: "Blue" },
            { value: "#004e6a", label: "DarkBlue" },
          ]}
          command={(value) =>
            editor?.chain().focus().toggleHighlight({ color: value }).run()
          }
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
        <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()}>
          <BsArrowReturnLeft size="20" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()}>
          <BsArrowReturnRight size="20" />
        </ToolbarBtn>
      </TextLine>
    </Container>
  );
};

export default Toolbar;

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
const SubmitBtn = styled.button`
  margin-right: 30px;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid #99999a;
  background-color: green;
  font-size: 20px;
  color: white;
  &:hover {
    cursor: pointer;
    border: 1px solid #0000001a;
  }
`;
