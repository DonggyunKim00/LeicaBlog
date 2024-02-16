import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

import { postChildCategory } from "../../../../pages/api/category";

interface Category {
  name: string;
  posts: { id: number; title: string }[];
}

const CreateContent: React.FC = () => {
  const router = useRouter();
  const { categoryId, categoryName } = router.query;
  const [subcategoryName, setSubcategoryName] = useState<string>("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subcategoryName.trim()) return;
    postChildCategory(categoryName, subcategoryName, categoryId);
    setSubcategoryName("");
  };
  return (
    <ListWrapper>
      <ListTitleBox>
        <ListTitle>{categoryName}의</ListTitle>
        <ListAmount>세부 카테고리 만들기</ListAmount>
      </ListTitleBox>
      <ListContents>
        <InputBox>
          <form onSubmit={handleCreate}>
            <CreateInput
              value={subcategoryName}
              onChange={(e: any) => setSubcategoryName(e.target.value)}
              placeholder="세부 카테고리 이름 입력 후 엔터"
            />
          </form>
        </InputBox>
      </ListContents>
    </ListWrapper>
  );
};

export default CreateContent;

const ListWrapper = styled.div`
  width: 966px;
  margin: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 8px;
  overflow: hidden;
  gap: 20px;
`;

const ListTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px 5px 0px;
`;

const ListTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ListAmount = styled.div`
  font-size: 13px;
  align-items: center;
`;

const ListContents = styled.div``;

const ContentsTitleBox = styled.div`
  width: 936px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;
const ContentInputLabel = styled.div`
  height: 20px;
  margin: 6px 0px 6px 0px;
  font-size: 12px;
  align-items: center;
  color: rgb(146, 146, 146);
`;

const CreateInput = styled.input`
  width: 200px;
  height: 30px;
  border: 3px solid #dedede;
  padding: 8px;
  border-radius: 10px;
  color: #000;
  background-color: white;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const InputBtn = styled.button`
  border: 3px solid #dedede;
  padding: 8px;
  border-radius: 10px;
  color: #000;
  background-color: white;
  &:hover {
    transition: all ease-out 200ms;
    box-shadow: 0px 0px 0px 4px #dedede;
  }
`;
