import React, { useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import styled, { css } from "styled-components";
import { ToolBarDivider } from "../Toolbar/ToolbarDivider";
import { BsCardImage } from "react-icons/bs";
import { useGetCategory } from "@/hooks/categoryHook/useCategory";
import { uploadImage } from "../../../../../pages/api/image";

interface ContentBoxProps {
  editor: Editor | null;
  register: any;
  thumbnailUrl: string;
  setThumnailUrl: any;
}
const ContentBox = ({
  editor,
  register,
  thumbnailUrl,
  setThumnailUrl,
}: ContentBoxProps) => {
  const [mainCate, setMainCate] = useState<string>("광학 현미경");

  const { data, refetch } = useGetCategory(mainCate, {
    refetchOnWindowFocus: false,
  });
  return (
    <Container>
      <ImageWrapper src={thumbnailUrl || "/img/writingPage/defaultImg.png"} />
      <TitleBox>
        <SelectBoard
          {...register("mainFolder", {
            required: true,
            onChange: async (e: any) => {
              await setMainCate(e.target.value);
              await refetch();
            },
          })}
        >
          <option value="광학 현미경">광학 현미경</option>
          <option value="디지털 현미경">디지털 현미경</option>
          <option value="현미경 카메라">현미경 카메라</option>
          <option value="실체현미경">실체현미경</option>
          <option value="마이크로 현미경">마크로로 현미경</option>
          <option value="현미경 소프트웨어">현미경 소프트웨어</option>
          <option value="전자현미경 시료전처리">전자현미경 시료전처리</option>
          <option value="교육용 현미경">교육용 현미경</option>
        </SelectBoard>
        <ToolBarDivider />
        {data ? (
          <SelectBoard {...register("subFolder", { required: true })}>
            {data.data.map((item: any) => {
              return (
                <option value={item.childName} key={item.id}>
                  {item.childName}
                </option>
              );
            })}
          </SelectBoard>
        ) : (
          <></>
        )}
        <ToolBarDivider />
        <TitleDiv>
          <Title
            placeholder="제목"
            type="text"
            {...register("title", { required: true })}
          />
          <Title
            placeholder="부제목"
            type="text"
            {...register("subTitle", { required: true })}
          />
        </TitleDiv>
        <ToolBarDivider />
        <ThumbnailInput
          type="file"
          id="thumbnail-file"
          {...register("thumbnail", {
            required: true,
            onChange: async (e: any) => {
              if (!e.target.files) {
                return;
              }

              const files = Array.from(e.target.files);
              files.forEach(async (file: any) => {
                const url = await uploadImage({
                  image: file,
                });
                setThumnailUrl(url);
              });
            },
          })}
        />
        <ThumbnailInputLabel htmlFor="thumbnail-file">
          <BsCardImage size="40" />
        </ThumbnailInputLabel>
      </TitleBox>
      <EditorContent editor={editor} />
    </Container>
  );
};

export default ContentBox;

const ThumbnailInput = styled.input`
  display: none;
`;
const ThumbnailInputLabel = styled.label`
  margin: 0px 5px;
  padding: 0px 5px;
  border-radius: 10px;
  border: 1px solid #99999a;
  background-color: white;
  position: relative;
  z-index: 2;
  &:hover {
    cursor: pointer;
    border: 1px solid #0000001a;
  }
`;
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
const ImageWrapper = styled.img`
  position: absolute;
  z-index: 1;
  width: 1100px;
  height: 130px;
  margin-top: 24px;
  opacity: 0.9;
  border-radius: 8px;
`;
const TitleBox = styled.div`
  ${FormInputCss}
  height: 130px;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.input`
  font-size: 15px;
  height: 30px;
  width: 100%;
  line-height: 100%;
  color: #252525;
  outline: none;
  border: 2px solid #0000001a;
  border-radius: 5px;
  position: relative;
  z-index: 2;
`;
const SelectBoard = styled.select`
  font-size: 15px;
  height: 30px;
  border: 2px solid #0000001a;
  outline: none;
  color: #252525;
  background-color: white;
  border-radius: 5px;
  position: relative;
  z-index: 2;
`;
const Container = styled.div`
  width: 1100px;
  height: 100%;
`;
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
