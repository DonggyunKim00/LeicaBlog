import React, { useContext, useEffect, useState } from "react";
import List from "./components/List";
import Content from "./components/Content";
import { css, styled } from "styled-components";
import { useRouter } from "next/router";
import { deleteBoard } from "../../../pages/api/board";
import Link from "next/link";
import { AdminContext } from "@/components/AdminProvider";

const DetailPostPage = () => {
  const router = useRouter();
  const boardId = Number(router.query.id);

  const [confirmBool, setConfirmBool] = useState<boolean>(false);

  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (confirmBool) {
      deleteBoard(boardId);
      router.push("/");
    }
  }, [confirmBool, boardId, router]);

  return (
    <>
      <List />
      {isAdmin && (
        <BtnList>
          <Link href={`/update?id=${boardId}`}>
            <ModifyBtn>수정하기</ModifyBtn>
          </Link>
          <DeleteBtn
            onClick={() =>
              setConfirmBool(confirm("정말로 게시물을 삭제 하시겠습니까?"))
            }
          >
            삭제하기
          </DeleteBtn>
        </BtnList>
      )}
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
  color:#000;
  background-color: white;
`;
const DeleteBtn = styled.button`
  ${button}
  color: white;
  background-color: red;
`;
