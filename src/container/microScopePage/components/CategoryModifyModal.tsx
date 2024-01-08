import React, { useState } from "react";
import { styled } from "styled-components";
import {
  deleteChildCategory,
  putChildCategory,
} from "../../../../pages/api/category";

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
    setIsConfirmVisible(false);
    deleteChildCategory(categoryId);
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
    putChildCategory(categoryId, modifyValue);
    setIsModifyVisible(false);
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
  border-radius: 20px;
  border-top-left-radius: 0px;
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
    border-bottom-left-radius: 17px;
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
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
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
  margin-bottom: 15px;
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
const ModifyInput = styled.input`
  width: 260px;
  margin-bottom: 10px;
`;
