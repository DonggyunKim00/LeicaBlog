import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

interface ListWrapperProps {
  expanded: boolean;
}

interface Category {
  name: string;
  posts: { id: number; title: string }[];
}

const ContentsList: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const router = useRouter();
  const { category } = router.query;

  const dummyData: Category[] = [
    {
      name: "초 광각 현미경",
      posts: [
        { id: 1, title: "글 제목1-1" },
        { id: 2, title: "글 제목1-2" },
      ],
    },
    {
      name: "진짜 대빵 큰 현미경",
      posts: [
        { id: 3, title: "글 제목2-1" },
        { id: 4, title: "글 제목2-2" },
      ],
    },
    {
      name: "대박 화질 개지리는 현미경",
      posts: [
        { id: 5, title: "글 제목3-1" },
        { id: 6, title: "글 제목3-2" },
      ],
    },
    {
      name: "대박 화질 개지리는 현미경",
      posts: [
        { id: 5, title: "글 제목3-1" },
        { id: 6, title: "글 제목3-2" },
      ],
    },
  
  ];

  return (
    <ListWrapper expanded={showList}>
      <ListTitleBox>
        <ListTitle>{category}</ListTitle>
        <ListAmount>{dummyData.length}개의 카테고리</ListAmount>

        <ListToggleBtn onClick={toggleList}>
          {showList ? "목록닫기" : "목록열기"}
        </ListToggleBtn>
      </ListTitleBox>
      {showList && (
        <ListContents>
          <ContentsTitleBox>
            <ContentsTitleSpan>카테고리 제목</ContentsTitleSpan>
            <ContentsDateSpan>글 갯수</ContentsDateSpan>
          </ContentsTitleBox>
          {dummyData.map((category) => (
            <ContentBox key={category.name}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryAmount>{category.posts.length}개의 글</CategoryAmount>
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
const ContentsDateSpan = styled.div`
  margin-left: auto;
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
  font-size: 12px;
  font: 나눔고딕;
`;

const CategoryAmount = styled.div`
  margin-left: auto;
  font-size: 12px;
  color: rgb(146, 146, 146);
`;
