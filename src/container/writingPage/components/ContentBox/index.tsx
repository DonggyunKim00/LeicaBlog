import React from "react";
import { Editor, EditorContent } from "@tiptap/react";
import styled, { css } from "styled-components";
import { ToolBarDivider } from "../Toolbar/ToolbarDivider";

interface ContentBoxProps {
  editor: Editor | null;
  register: any;
}
const ContentBox = ({ editor, register }: ContentBoxProps) => {
  return (
    <Container>
      <TitleBox>
        <SelectBoard {...register("mainFolder", { required: true })}>
          <option value="광학 현미경">광학 현미경</option>
          <option value="디지털 현미경">디지털 현미경</option>
          <option value="현미경 카메라">현미경 카메라</option>
          <option value="실체현미경">실체현미경</option>
          <option value="마크로로 현미경">마크로로 현미경</option>
          <option value="현미경 소프트웨어">현미경 소프트웨어</option>
          <option value="전자현미경 시료전처리">전자현미경 시료전처리</option>
          <option value="교육용 현미경">교육용 현미경</option>
        </SelectBoard>
        <ToolBarDivider />
        <SelectBoard {...register("subFolder", { required: true })}>
          <option value="모델 1번 폴더">모델 1번 폴더</option>
          <option value="모델 넘버 2번 폴더">모델 넘버 2번 폴더</option>
        </SelectBoard>
        <ToolBarDivider />
        <Title
          placeholder="제목"
          type="text"
          {...register("title", { required: true })}
        />
      </TitleBox>
      <EditorContent editor={editor} />
    </Container>
  );
};

export default ContentBox;

const FormInputCss = css`
  border: 1px solid #0000001a;
  border-radius: 8px;
  width: 100%;
  height: 41px;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ffffff;
  color: #252525;
  ::placeholder {
    color: #00000080;
  }
`;
const TitleBox = styled.div`
  ${FormInputCss}
  height: 59px;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.input`
  height: 100%;
  width: 100%;
  position: relative;
  line-height: 100%;
  color: #252525;
  outline: none;
  border: none;
`;
const SelectBoard = styled.select`
  border: none;
  background-color: transparent;
  outline: none;
  color: #252525;
`;
const Container = styled.div`
  width: 1100px;
  height: 100%;
`;
