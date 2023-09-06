import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Board, { BoardProps } from "./Board";

interface PageButtonProps {
  $isactive: boolean;
}
const Content = () => {
  const dummyData: any = [
    {
      boardId: 1,
      imgSrc: "/img/main/middle/1.png",
      title: "김성훈 바보 김성훈 바보 김성훈 바보",
      subCategory: "김동균",
      mainText: "김동균이에요",
      createTime: "2023/07/14 11:12",
    },
    {
      boardId: 2,
      imgSrc: "/img/main/middle/1.png",
      title: "김성훈 바보 김성훈 바보 김성훈 바보",
      subCategory: "김동균",
      mainText:
        "김성훈 바보 김성훈 바보 김성훈 바보김성훈 바보 김성훈 바보 김성훈 바보",
      createTime: "2023/07/14 11:12",
    },
    {
      boardId: 3,
      imgSrc: "/img/main/middle/1.png",
      title: "김성훈 바보 김성훈 바보 김성훈 바보",
      subCategory: "김동균",
      mainText:
        "김성훈 바보 김성훈 바보 김성훈 바보김성훈 바보 김성훈 바보 김성훈 바보",
      createTime: "2023/07/14 11:12",
    },
    {
      boardId: 4,
      imgSrc: "/img/main/middle/1.png",
      title: "김성훈 바보 김성훈 바보 김성훈 바보",
      subCategory: "김동균",
      mainText:
        "김성훈 바보 김성훈 바보 김성훈 바보김성훈 바보 김성훈 바보 김성훈 바보",
      createTime: "2023/07/14 11:12",
    },
  ];
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  // 페이지가 변경될 때마다 새로운 데이터 계산
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dummyData.slice(startIndex, endIndex);
  };

  const currentItems = getPaginatedData();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 페이지가 마지막 페이지보다 크다면 마지막 페이지로 설정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const router = useRouter();
  return (
    <Container>
      <Header>
        <Result>
          <span>검색 결과</span>
          <span className="orange">639건</span>
        </Result>
        <Line />
      </Header>
      <BoardList>
        {currentItems ? (
          currentItems.map((item: BoardProps, idx: number) => {
            return (
              <Board
                boardId={item.boardId}
                imgSrc={item.imgSrc}
                title={item.title}
                subCategory={item.subCategory}
                mainText={item.mainText}
                createTime={item.createTime}
                key={idx}
              />
            );
          })
        ) : (
          <NoDataBoard>{` "${router.query.keyword}"+ 검색결과가 없습니다.`}</NoDataBoard>
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
