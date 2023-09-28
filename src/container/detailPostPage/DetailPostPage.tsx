import React, { useEffect, useState } from "react";
import List from "./components/List";
import Content from "./components/Content";
import { css, styled } from "styled-components";
import { useRouter } from "next/router";
import { deleteBoard } from "../../../pages/api/board";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

const DetailPostPage = () => {
  const router = useRouter();
  const boardId = Number(router.query.id);

  const [adminValue, setAdminValue] = useState<boolean>(false);
  const [onModal, setOnModal] = useState<boolean>(false);

  useEffect(() => {
    const adminKey = secureLocalStorage.getItem("adminKey");
    setAdminValue(router.query.admin == adminKey);
  }, [router.query.admin]);

  return (
    <>
      <List />
      {adminValue && (
        <BtnList>
          <Link href={`/update?id=${boardId}`}>
            <ModifyBtn>수정하기</ModifyBtn>
          </Link>
          <DeleteBtn onClick={() => setOnModal(true)}>삭제하기</DeleteBtn>
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
