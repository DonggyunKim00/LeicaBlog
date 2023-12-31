import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { getChildCategory } from "../../../../pages/api/category";

interface Category {
  name: string;
  posts: { id: number; title: string }[];
}

const CreateContent: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [subcategoryName, setSubcategoryName] = useState<string>("");
  const handleCreate = async () => {
    if (subcategoryName) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/category/child`,
          {
            parentName: category,
            childName: subcategoryName,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(category + "의 세부 카테고리가 성공적으로 생성되었습니다.");
          setSubcategoryName("");
          window.location.reload();
        } else {
          console.error("Failed to create subcategory");
        }
      } catch (error) {
        console.error("Error creating subcategory:", error);
      }
    }
  };

  return (
    <ListWrapper>
      <ListTitleBox>
        <ListTitle>{category}의</ListTitle>
        <ListAmount>세부 카테고리 만들기</ListAmount>
      </ListTitleBox>
      <ListContents>
        <ContentsTitleBox>
          <ContentInputLabel>카테고리 제목 입력</ContentInputLabel>
        </ContentsTitleBox>
        <InputBox>
          <CreateInput
            value={subcategoryName}
            onChange={(e: any) => setSubcategoryName(e.target.value)}
            placeholder="세부 카테고리 이름 입력"
          />
          <InputBtn onClick={handleCreate}> 만들기 </InputBtn>
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
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBtn = styled.button`
  width: 100px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
  border: 1px solid rgb(146, 146, 146);
  border-radius: 2px;
  margin-left: 20px;
`;
