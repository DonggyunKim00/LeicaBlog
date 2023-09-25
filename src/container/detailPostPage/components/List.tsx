import { Router, useRouter } from "next/router";
import React, { useState, useEffect, use } from "react";
import styled from "styled-components";

interface ListWrapperProps {
  $expanded: boolean;
}
interface Post {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  writer: string;
  category: string;
  parentCategory: string;
}
interface childrenPost {
  size: number;
  childList: ChildrenList[];
}
interface ChildrenList {
  id: number;
  title: string;
  subTitle: string;
  thumbnail: string;
  category: string;
  created_at: string;
}
interface PageButtonProps {
  $isactive: boolean;
}
const ContentsList: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [childrenPost, setChildrenPost] = useState<childrenPost | null>(null);
  const [Items, setItems] = useState<childrenPost[]>([]);

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

  useEffect(() => {
    if (id && post) {
      const { parentCategory, category } = post;
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find/post/${parentCategory}/${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          setChildrenPost(data);
          setItems(data);
        })
        .catch((error) => {
          console.error("자식 카테고리 게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [id, post]);

  const handleTitleClick = (postId: number) => {
    router.push({
      query: { id: postId },
    });
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = childrenPost
    ? Math.max(Math.ceil(childrenPost.childList.length / itemsPerPage), 1)
    : 1;

  const getPaginatedData = (data: any) => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.childList.slice(startIndex, endIndex);
  };

  const currentItems = getPaginatedData(childrenPost);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  return (
    <>
      <ListWrapper $expanded={showList}>
        <ListTitleBox>
          {post ? (
            <>
              <ListTitle>{post.category}</ListTitle>
              <ListAmount>{childrenPost?.size || 0}개의 글</ListAmount>
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
            {currentItems ? (
              currentItems.map((post: any) => (
                <ContentBox
                  key={post.id}
                  onClick={() => handleTitleClick(post.id)}
                >
                  <CategoryTitle>{post.title}</CategoryTitle>
                  <CategoryAmount>작성일 {post.created_at}</CategoryAmount>
                </ContentBox>
              ))
            ) : (
              <div>Loading...</div>
            )}

            <Page>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  $isactive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
            </Page>
          </ListContents>
        )}
      </ListWrapper>
    </>
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
  margin-left: 855px;
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
  width: 895px;
  font-size: 12px;
  font: 나눔고딕;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CategoryAmount = styled.div`
  margin-left: 0px;
  font-size: 12px;
  color: rgb(146, 146, 146);
`;

const Page = styled.div`
  width: 926px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<PageButtonProps>`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  background-color: white;
  color: ${(props) => (props.$isactive ? "#ff0000" : "black")};
  border: 2px solid ${(props) => (props.$isactive ? "#d3d3d3" : "white")};
  font-weight: ${(props) => (props.$isactive ? "600" : "400")};
  cursor: pointer;
  outline: none;
  &:hover {
    border: 2px solid #d3d3d3;
  }
`;
