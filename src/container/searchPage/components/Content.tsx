import { useSearchBoard } from "@/hooks/pagenateHook/usePagenate";
import { useRouter } from "next/router";
import React from "react";
import { css, styled } from "styled-components";
import Board, { BoardProps } from "./Board";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useSearchBoardData } from "@/hooks/boardHook/useBoard";

interface PageButtonProps {
  $isactive: boolean;
}

const Content = () => {
  const router = useRouter();
  const keyword = router.query.keyword?.toString() || "";
  const page = Number(router.query.page) || 1;

  const { findBoard } = useSearchBoardData({
    keyword: keyword,
    size: 10,
    page: page,
  });

  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroups,
  } = useSearchBoard({
    apiData: findBoard,
  });

  return (
    <Container>
      <Header>
        <Result>
          <span>검색 결과</span>
          {findBoard && (
            <span className="orange">{findBoard.totalElement}</span>
          )}
        </Result>
        <Line />
      </Header>
      <BoardList>
        {findBoard && findBoard.totalElement == 0 ? (
          <NoDataBoard>{` "${router.query.keyword}" 검색결과가 없습니다.`}</NoDataBoard>
        ) : (
          <>
            {findBoard.childList.map((item: BoardProps, idx: number) => {
              return (
                <Board
                  id={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  parentName={item.parentName}
                  childName={item.childName}
                  content={item.content}
                  createdAt={item.createdAt}
                  subTitle={item.subTitle}
                  key={idx}
                />
              );
            })}
          </>
        )}
      </BoardList>
      {findBoard.childList[0] && (
        <PageBoxContainer>
          <PageBox>
            <Page>
              {pageGroups !== 0 && (
                <PrevBtn
                  onClick={() => {
                    handlePrevGroup(pageGroups);
                  }}
                >
                  <BiSolidLeftArrow size="5" />
                  <span>이전</span>
                </PrevBtn>
              )}
              {pages ? (
                pages.map((item: number) => {
                  return (
                    <PageButton
                      key={item}
                      $isactive={currentPage === item}
                      onClick={() => handlePageChange(item)}
                      value={currentPage}
                    >
                      {item}
                    </PageButton>
                  );
                })
              ) : (
                <></>
              )}
              {pageGroups !== lastPageGroup && (
                <NextBtn
                  onClick={() => {
                    handleNextGroup(pageGroups);
                  }}
                >
                  <span>다음</span>
                  <BiSolidRightArrow size="5" />
                </NextBtn>
              )}
            </Page>
          </PageBox>
        </PageBoxContainer>
      )}
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
const pagingBtn = css`
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 0px 8px;
`;

const NextBtn = styled.button`
  ${pagingBtn}
`;
const PrevBtn = styled.button`
  ${pagingBtn}
`;
