import React, { useContext, useEffect, useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import styled, { css } from "styled-components";
import { ToolBarDivider } from "../Toolbar/ToolbarDivider";
import { BsCardImage } from "react-icons/bs";
import {
  useGetChildCategory,
  useGetParentCategory,
} from "@/hooks/categoryHook/useCategory";
import { uploadImage } from "../../../../../pages/api/image";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { useIsUpdateBoard } from "@/hooks/boardHook/useBoard";
import { FileLoadingContext } from "@/components/FileLoadingProvider";

interface ContentBoxProps {
  editor: Editor | null;
  register: any;
  thumbnailUrl: string;
  setThumnailUrl: any;
  errors: any;
  setValue: any;
  setPreRenderThumbnail: any;
  preRenderThumbnail: string;
  setPreRenderCreatedAt: any;
}
const ContentBox = ({
  editor,
  register,
  thumbnailUrl,
  setThumnailUrl,
  errors,
  setValue,
  setPreRenderThumbnail,
  preRenderThumbnail,
  setPreRenderCreatedAt,
}: ContentBoxProps) => {
  const { setIsLoading } = useContext(FileLoadingContext);

  const router = useRouter();
  const boardId = Number(router.query.id);
  // 초기값 설정을 위한 state
  // update페이지가 아닐때는 기본값이 ""
  // update일때는 기본값이 post에 의존(아래의 useEffect 참조)
  const [mainCateName, setMainCateName] = useState<string>("");
  const [mainCateId, setMainCateId] = useState<number>(0);
  const [subCateName, setSubCateName] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [subTitleValue, setSubTitleValue] = useState<string>("");

  // update페이지 ? post : null
  const { post } = useIsUpdateBoard(boardId);

  // 부모 카테고리 get
  const { data: categories } = useGetParentCategory();
  // 자식 카테고리 get
  const { data, refetch } = useGetChildCategory(mainCateId, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // update페이지 일때 post를 이용하여 초기값 설정
    if (post) {
      setMainCateName(post.parentName);
      setSubCateName(post.childName);
      setTitleValue(post.title);
      setSubTitleValue(post.subTitle);
      setPreRenderThumbnail(post.thumbnail || "");
      setPreRenderCreatedAt(post.createdAt || "");
      setMainCateId(post.parentId);
    }
  }, [post, setPreRenderThumbnail, setPreRenderCreatedAt]);

  useEffect(() => {
    // 마운트 이후에 react-hook-form의 value값 초기화.
    // post가 있을때는 초기값이 post값, 없을때는 state 기본값
    refetch();
    setValue("mainFolder", mainCateName);
    setValue("subFolder", subCateName);
  }, [refetch, setValue, mainCateName, subCateName, mainCateId]);
  useEffect(() => {
    setValue("title", titleValue);
    setValue("subTitle", subTitleValue);
  }, [setValue, titleValue, subTitleValue]);
  useEffect(() => {
    setValue("thumbnail", preRenderThumbnail);
  }, [setValue, preRenderThumbnail]);

  return (
    <Container>
      <ImageWrapper
        src={
          post
            ? preRenderThumbnail
            : thumbnailUrl || "/img/writingPage/defaultImg.png"
        }
      />
      <TitleBox>
        <ErrorMessageDiv>
          <ErrorMessage
            errors={errors}
            name="mainFolder"
            render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
          />
          {categories && (
            <SelectBoard
              value={mainCateName}
              {...register("mainFolder", {
                required: {
                  value: true,
                  message: "메인 카테고리를 선택해주세요",
                },
                onChange: async (e: any) => {
                  const selectedOption =
                    e.currentTarget.options[e.target.selectedIndex];
                  setMainCateName(selectedOption.value);
                  setMainCateId(Number(selectedOption.dataset.id));
                  refetch();
                },
              })}
            >
              <option value="">메인 카테고리를 선택해주세요</option>
              {categories.data.map((item: any) => {
                return (
                  <option
                    value={item.parentName}
                    key={item.parentId}
                    data-id={item.parentId}
                  >
                    {item.parentName}
                  </option>
                );
              })}
            </SelectBoard>
          )}
        </ErrorMessageDiv>
        <ToolBarDivider />

        <ErrorMessageDiv>
          <ErrorMessage
            errors={errors}
            name="subFolder"
            render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
          />
          <SelectBoard
            value={subCateName}
            {...register("subFolder", {
              required: {
                value: true,
                message: "하위 카테고리를 선택해주세요.",
              },
              onChange: async (e: any) => {
                await setSubCateName(e.target.value);
              },
            })}
          >
            <option value="">하위 카테고리를 선택해주세요</option>
            {data &&
              data.data.map((item: any) => {
                return (
                  <option value={item.childName} key={item.childId}>
                    {item.childName}
                  </option>
                );
              })}
          </SelectBoard>
        </ErrorMessageDiv>

        <ToolBarDivider />
        <TitleDiv>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
          />
          <Title
            placeholder="제목"
            type="text"
            value={titleValue}
            {...register("title", {
              required: { value: true, message: "제목은 필수 입니다." },
              onChange: (e: any) => {
                setTitleValue(e.target.value);
              },
            })}
          />
          <Title
            placeholder="부제목"
            type="text"
            value={subTitleValue}
            onChange={(e: any) => setSubTitleValue(e.target.value)} // 상태 업데이트 함수 연결
            {...register("subTitle", {
              onChange: (e: any) => {
                setSubTitleValue(e.target.value);
              },
            })}
          />
        </TitleDiv>
        <ToolBarDivider />
        <ThumbnailInput
          type="file"
          id="thumbnail-file"
          {...register("thumbnail", {
            required: {
              value: post?.thumbnail ? false : true,
              message: "썸네일 이미지는 필수 입니다.",
            },
            onChange: async (e: any) => {
              if (!e.target.files) {
                return;
              }

              const files = Array.from(e.target.files);
              files.forEach(async (file: any) => {
                const url = await uploadImage(
                  {
                    image: file,
                  },
                  setIsLoading
                );
                if (preRenderThumbnail) setPreRenderThumbnail(url);
                else setThumnailUrl(url);
              });
            },
          })}
        />
        <ErrorMessageDiv>
          <ThumbnailInputLabel htmlFor="thumbnail-file">
            <BsCardImage size="40" />
          </ThumbnailInputLabel>
          <ErrorMessage
            errors={errors}
            name="thumbnail"
            render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
          />
        </ErrorMessageDiv>
      </TitleBox>
      <EditorContent editor={editor} />
    </Container>
  );
};

export default ContentBox;
const ErrorMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const ErrorSpan = styled.span`
  position: relative;
  z-index: 3;
  color: red;
  font-size: 10px;
`;
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
  margin-bottom: 3px;
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
  width: 1000px;
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
  margin-bottom: 10px;
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
  width: 1000px;
  height: 100%;
`;
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
