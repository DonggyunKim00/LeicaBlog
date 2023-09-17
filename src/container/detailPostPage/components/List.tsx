import { useRouter } from "next/router";
import React, { useState, useEffect, use } from "react";
import styled from "styled-components";

interface ListWrapperProps {
  $expanded: boolean;
}

interface Category {
  name: string;
  posts: { id: number; title: string }[];
}

interface Post {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  writer: string;
  category: string;
}

const ContentsList: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/find/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [id]);



  return (
    <ListWrapper $expanded={showList}>
      <ListTitleBox>
      {post ? (
          <>
            <ListTitle>{post.category}</ListTitle>
            <ListAmount>{categories.length}개의 글</ListAmount>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <ListToggleBtn onClick={toggleList}>
          {showList ? "목록닫기" : "목록열기"}
        </ListToggleBtn>
      </ListTitleBox>
      {showList && (
        <ListContents>
          <ContentsTitleBox>
            <ContentsTitleSpan>글 제목</ContentsTitleSpan>
            <ContentsAmountSpan>작성일</ContentsAmountSpan>
          </ContentsTitleBox>
          {categories.map((category, index) => (
            <ContentBox key={category.name}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryAmount>2 개의 글</CategoryAmount>
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
  margin-left: 845px;
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
