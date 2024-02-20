import { useRouter } from "next/router";
import React from "react";
import { styled } from "styled-components";
import Board, { BoardProps } from "./Board";
import { useSearchBoardData } from "@/hooks/boardHook/useBoard";
import PagenateBox from "@/components/PagenateBox";

const Content = () => {
  const router = useRouter();
  const keyword = router.query.keyword?.toString() || "";
  const page = Number(router.query.page) || 1;

  const { findBoard } = useSearchBoardData({
    keyword: keyword,
    size: 10,
    page: page,
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
          <PagenateBox apiData={findBoard} size={19} />
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
const PageBoxContainer = styled.div`
  margin-top: 8px;
`;
