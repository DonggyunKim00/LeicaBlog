import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryModifyModal from "./CategoryModifyModal";

interface ListWrapperProps {
  $expanded: boolean;
}

interface Category {
  id: string;
  childName : string;
}

const ContentsList: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const toggleModal = (index: number) => {
    setActiveModalIndex(index === activeModalIndex ? null : index);
  };

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          const categoryResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/find/category/${category}`
          );
          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();

            const children = categoryData;
            setCategories(children);
          } else {
            console.error(
              "API request for category failed with status:",
              categoryResponse.status
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    fetchData();
  }, [category]);

  return (
    <ListWrapper $expanded={showList}>
      <ListTitleBox>
        <ListTitle>{category}</ListTitle>
        <ListAmount>{categories.length}개의 카테고리</ListAmount>

        <ListToggleBtn onClick={toggleList}>
          {showList ? "목록닫기" : "목록열기"}
        </ListToggleBtn>
      </ListTitleBox>
      {showList && (
        <ListContents>
          <ContentsTitleBox>
            <ContentsTitleSpan>카테고리 제목</ContentsTitleSpan>
            <ContentsAmountSpan>글 갯수</ContentsAmountSpan>
          </ContentsTitleBox>
          {categories.map((category, index) => (
            <ContentBox key={category.childName}>
              <CategoryTitle>{category.childName}</CategoryTitle>
              <CategoryAmount>2 개의 글</CategoryAmount>
              <DetailBtn>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => toggleModal(index)}
                  style={{ cursor: "pointer" }}
                >
                  <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>
                  <circle cx="12" cy="12" r="3.5"></circle>
                </svg>
              </DetailBtn>
              {activeModalIndex === index && <CategoryModifyModal />}
            </ContentBox>
          ))}
        </ListContents>
      )}
    </ListWrapper>
  );
};

export default ContentsList;

const ListWrapper = styled.div<ListWrapperProps>`
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
  justify-content: space-between;
  margin: 5px 0px 5px 0px;
`;

const ListTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  align-items: center;
  margin-right: 5px;
`;

const ListAmount = styled.div`
  font-size: 13px;
  align-items: center;
`;

const ListToggleBtn = styled.div`
  font-size: 13px;
  height: 17.6px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ListContents = styled.div``;

const ContentsTitleBox = styled.div`
  width: 936px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  border-bottom: 1px solid;
  border-color: rgb(146, 146, 146);
`;
const ContentsTitleSpan = styled.div`
  height: 20px;
  margin: 6px 0px 6px 0px;
  font-size: 12px;
  align-items: center;
  color: rgb(146, 146, 146);
`;
const ContentsAmountSpan = styled.div`
  margin-left: 780px;
  font-size: 12px;
  padding: 6px 0px 6px 0px;
  color: rgb(146, 146, 146);
`;

const ContentBox = styled.div`
  width: 936px;
  height: 36px;
  border-bottom: 1px solid;
  border-color: rgb(223, 223, 223);
  align-items: center;
  display: flex;
`;

const CategoryTitle = styled.div`
  width: 200px;
  font-size: 12px;
  font: 나눔고딕;
`;

const CategoryAmount = styled.div`
  margin-left: 650px;
  font-size: 12px;
  color: rgb(146, 146, 146);
`;
const DetailBtn = styled.div`
  color: rgb(146, 146, 146);
  margin-left: 15px;
  width: 20px;
  height: 20px;
`;
const Modal = styled.div`
  width: 100px;
  height: 20px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 15px;
  position: absolute;
  right: 100px;
`;
