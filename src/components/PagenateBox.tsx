import React from "react";
import { css, styled } from "styled-components";
import { usePagenate } from "@/hooks/pagenateHook/usePagenate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface PageButtonProps {
  $isactive: boolean;
  size: number;
}

/**
 *
 * @param param0 페이징 하려는 apiData props로 넘기기
 * @returns
 */
const PagenateBox = ({ apiData, size }: any) => {
  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroupsNum,
  } = usePagenate({
    apiData,
  });
  return (
    <PageBox size={size}>
      <Page>
        {pageGroupsNum !== 0 && (
          <PrevBtn
            onClick={() => {
              handlePrevGroup();
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
                size={size}
              >
                {item}
              </PageButton>
            );
          })
        ) : (
          <></>
        )}
        {pageGroupsNum !== lastPageGroup && (
          <NextBtn
            onClick={() => {
              handleNextGroup();
            }}
          >
            <span>다음</span>
            <BiSolidRightArrow size="5" />
          </NextBtn>
        )}
      </Page>
    </PageBox>
  );
};

export default PagenateBox;

const PageBox = styled.div<{ size: number }>`
  width: 966px;
  height: ${(props) => `${props.size}px`};
  border-radius: 5px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.div`
  width: 926px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button<PageButtonProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isactive ? "#ff0000" : "black")};
  cursor: pointer;
  outline: none;
  border-right: 1px solid #dddddd;
  font-size: ${(props) => `${props.size - 2}px`};
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
