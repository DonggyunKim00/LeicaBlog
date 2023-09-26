import React from "react";
import List from "./components/List";
import Content from "./components/Content";
import { css, styled } from "styled-components";
import { useRouter } from "next/router";
import { deleteBoard } from "../../../pages/api/board";

const DetailPostPage = () => {
  const router = useRouter();

  const boardId = Number(router.query.id);
  console.log(boardId);

  return (
    <>
      <List />
      <BtnList>
        <ModifyBtn>수정하기</ModifyBtn>
        <DeleteBtn>삭제하기</DeleteBtn>
      </BtnList>
      <Content />
    </>
  );
};

export default DetailPostPage;

const BtnList = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 966px;
  margin: 25px auto 10px;
`;

const button = css`
  border: 2px solid #dedede;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    transition: all ease-out 200ms;
    box-shadow: 0px 0px 0px 4px #dedede;
  }
`;

const ModifyBtn = styled.button`
  ${button}
  background-color: white;
`;
const DeleteBtn = styled.button`
  ${button}
  color: white;
  background-color: red;
`;
