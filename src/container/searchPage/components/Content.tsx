import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Board, { BoardProps } from "./Board";

interface PageButtonProps {
  $isactive: boolean;
}
const Content = () => {
  const router = useRouter();

  const { keyword } = router.query;
  const [findBoard, setFindBoard] = useState<any>(null);

  useEffect(() => {
    if (keyword) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/post?keyword=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          setFindBoard(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [keyword]);
  console.log(findBoard);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = findBoard && Math.ceil(findBoard.size / itemsPerPage);

  // 페이지가 변경될 때마다 새로운 데이터 계산
  const getPaginatedData = () => {
    if (findBoard) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return findBoard.childList.slice(startIndex, endIndex);
    }
  };

  const currentItems = getPaginatedData();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  console.log(currentItems);
  // 페이지가 마지막 페이지보다 크다면 마지막 페이지로 설정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <Container>
      <Header>
        <Result>
          <span>검색 결과</span>
          {findBoard && <span className="orange">{findBoard.size}</span>}
        </Result>
        <Line />
      </Header>
      <BoardList>
        {findBoard && findBoard.size != 0 ? (
          findBoard.childList.map((item: BoardProps, idx: number) => {
            return (
              <Board
                id={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                childName={item.childName}
                content={item.content}
                createTime={item.createTime}
                subTitle={item.subTitle}
                key={idx}
              />
            );
          })
        ) : (
          <NoDataBoard>{` "${router.query.keyword}" 검색결과가 없습니다.`}</NoDataBoard>
        )}
      </BoardList>
      <PageBoxContainer>
        <PageBox>
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
        </PageBox>
      </PageBoxContainer>
    </Container>
  );
};

export default Content;

const Container = styled.div`
  font-size: 12px;
  line-height: 17px;
`;
const NoDataBoard = styled.div`
  display: flex;
  justify-content: center;
  padding: 120px 0px;
`;
const Header = styled.div``;
const Result = styled.div`
  font-weight: 700;
  display: flex;
  gap: 2px;
  .orange {
    color: rgb(255, 118, 53);
  }
`;
const BoardList = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-bottom: 1px solid rgb(209, 209, 209);
`;
const Line = styled.div`
  margin: 5px 0px;
  border-bottom: 2px solid rgb(209, 209, 209);
`;

const PageBox = styled.div`
  width: 966px;
  height: 19px;
  border-radius: 5px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageBoxContainer = styled.div`
  margin-top: 8px;
`;

const Page = styled.div`
  width: 926px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button<PageButtonProps>`
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isactive ? "#ff0000" : "black")};
  cursor: pointer;
  outline: none;
  border-right: 1px solid #dddddd;
  &:hover {
    background-color: #eeeeee; /* 호버 시 보더 스타일 정의 */
  }
`;
