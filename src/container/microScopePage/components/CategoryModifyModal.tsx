import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";

const CategoryModifyModal: React.FC<{ categoryId: number | null }> = ({
  categoryId,
}) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isModifyVisible, setIsModifyVisible] = useState(false);
  const [modifyValue, setModifyValue] = useState("");

  const handleDeleteClick = () => {
    setIsConfirmVisible(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/category/child/${categoryId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("카테고리가 삭제되었습니다");
        setIsConfirmVisible(false);
      } else {
        console.error("카테고리 삭제 실패:", response);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handleCancelDelete = () => {
    setIsConfirmVisible(false);
  };

  const handleModifyClick = () => {
    setIsModifyVisible(true);
  };
  const handleCancleModify = () => {
    setIsModifyVisible(false);
  };

  const handleConfirmModify = async () => {
    try {
      console.log(modifyValue);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`,
        {
          categoryName: modifyValue,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("카테고리 수정 성공");
        setIsModifyVisible(false);
      } else {
        console.error("카테고리 수정 실패:", response);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  return (
    <>
      <Wrapper>
        <DeleteBtn onClick={handleDeleteClick}>삭제</DeleteBtn>
        <ModifyBtn onClick={handleModifyClick}>수정</ModifyBtn>
      </Wrapper>
      {isConfirmVisible && (
        <ModalOverlay>
          <ConfirmModal>
            <ConfirmMessage>
              정말로 삭제하시겠습니까? 카테고리 안에 있는 게시물이 모두
              삭제됩니다!
            </ConfirmMessage>
            <ConfirmButtons>
              <ConfirmButton onClick={handleConfirmDelete}>확인</ConfirmButton>
              <ConfirmButton onClick={handleCancelDelete}>취소</ConfirmButton>
            </ConfirmButtons>
          </ConfirmModal>
        </ModalOverlay>
      )}
      {isModifyVisible && (
        <ModalOverlay>
          <ConfirmModal>
            <ConfirmMessage>수정할 이름을 작성해주세요.</ConfirmMessage>
            <ModifyInput
              type="text"
              value={modifyValue}
              onChange={(e: any) => setModifyValue(e.target.value)}
            />
            <ConfirmButtons>
              <ConfirmButton onClick={handleConfirmModify}>수정</ConfirmButton>
              <ConfirmButton onClick={handleCancleModify}>취소</ConfirmButton>
            </ConfirmButtons>
          </ConfirmModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default CategoryModifyModal;

const Wrapper = styled.div`
  width: 110px;
  height: 36px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  position: absolute;
  right: 140px;
  z-index: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteBtn = styled.div`
  width: 55px;
  height: 36px;
  border-right: 3px solid rgb(199, 199, 199);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgb(199, 199, 199);
  }
`;

const ModifyBtn = styled.div`
  width: 55px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgb(199, 199, 199);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmModal = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ConfirmMessage = styled.div`
  margin-bottom: 20px;
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ConfirmButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;
const ModifyInput = styled.input``;
