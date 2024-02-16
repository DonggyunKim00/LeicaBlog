import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import PagenateBox from "@/components/PagenateBox";

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
  childName: string;
  parentName: string;
  parentId: number;
  childId: number;
}
interface ResponseDataItem {
  totalElement: number;
  lastPage: boolean;
  totalPage: number;
  childList: any[];
}

const ContentsList: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const page = Number(router.query.page) || 1;

  const [showList, setShowList] = useState<boolean>(true);
  const [childrenPost, setChildrenPost] = useState<ResponseDataItem | null>(
    null
  );
  const [size, setSize] = useState(5);
  const [controllerToggle, setControllerToggle] = useState(false);
  const sizeOptions = [5, 10, 15, 20, 30];

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/find/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [id]);

  const [pageItems, setPageItems] = useState<ResponseDataItem>({
    totalElement: 0,
    lastPage: false,
    totalPage: 1,
    childList: [],
  });
  useEffect(() => {
    if (id && post) {
      const { parentId, childId } = post;
      fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/post/${parentId}/${childId}?size=${size}&page=${page - 1}`
      )
        .then((response) => response.json())
        .then((data) => {
          setChildrenPost(data);
          setPageItems(data);
        })
        .catch((error) => {
          console.error("자식 카테고리 게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [id, page, post, size]);

  const handleTitleClick = (postId: number) => {
    router.push({
      query: { id: postId },
    });
  };
  const handleControler = () => {
    setControllerToggle(!controllerToggle);
  };
  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setControllerToggle(false);
  };

  return (
    <>
      <ListWrapper $expanded={showList}>
        <ListTitleBox>
          {post ? (
            <>
              <ListTitle>
                {post.parentName} - {post.childName}
              </ListTitle>
              <ListAmount>{childrenPost?.totalElement || 0}개의 글</ListAmount>
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
            {pageItems ? (
              pageItems.childList.map((post: any) => (
                <ContentBox
                  key={post.id}
                  onClick={() => handleTitleClick(post.id)}
                >
                  <CategoryTitle>{post.title}</CategoryTitle>
                  <CategoryAmount>{post.createdAt}</CategoryAmount>
                </ContentBox>
              ))
            ) : (
              <div>Loading...</div>
            )}
            <PageControlerLine>
              <PageControlerBox onClick={handleControler}>
                {size}줄 보기
                {controllerToggle ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </PageControlerBox>
              {controllerToggle && (
                <PageControlerExpand>
                  {sizeOptions.map((option) => (
                    <ExpandLine
                      key={option}
                      $isSelected={size === option}
                      onClick={() => handleSizeChange(option)}
                    >
                      {option}줄 보기
                    </ExpandLine>
                  ))}
                </PageControlerExpand>
              )}
            </PageControlerLine>
            <PagenateBox apiData={pageItems} size={20} />
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
  font-size: 12px;
  color: rgb(146, 146, 146);
`;

const PageControlerLine = styled.div`
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: flex-end;
  width: 936px;
`;
const PageControlerBox = styled.div`
  width: 97px;
  height: 28px;
  border: 1px solid rgb(221, 221, 221);
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 12px;
  color: rgb(37, 37, 37);
  cursor: pointer;
`;
const PageControlerExpand = styled.div`
  width: 97px;
  height: 139px;
  border: 1px solid rgb(221, 221, 221);
  position: absolute;
  margin-top: 28px;
  background-color: white;
  border-top: none;
`;
const ExpandLine = styled.div<{ $isSelected: boolean }>`
  width: 97px;
  height: 27px;
  color: rgb(37, 37, 37);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
`;
