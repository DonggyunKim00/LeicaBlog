import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Router from "next/router";
import { pathName } from "@/config/pathName";
import { useSearchBoard } from "../../../hooks/pagenateHook/usePagenate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { AdminContext } from "@/components/AdminProvider";
import Link from "next/link";
import {
  getMicroContent,
  getSubMicroContent,
} from "../../../../pages/api/subContents";

interface PageButtonProps {
  $isactive: boolean;
}

interface ResponseDataItem {
  totalElement: number;
  lastPage: boolean;
  totalPage: number;
  childList: any[];
}

interface ChildrenList {
  id: number;
  title: string;
  content: string;
  subTitle: string | null;
  thumbnail: string;
  parentName: string;
  category: string;
  childName: string;
  createdAt: string;
}
interface ItemNameProps {
  $hoveredItem: boolean;
}
const MicroContents = () => {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext);
  const { categoryName, categoryId, subCategoryName, subCategoryId } =
    router.query;

  const [pageItems, setPageItems] = useState<ResponseDataItem>({
    totalElement: 0,
    lastPage: false,
    totalPage: 1,
    childList: [],
  });
  const [hoveredItem, setHoveredItem] = useState<Number | null>();

  const page = Number(router.query.page) || 1;

  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroups,
  } = useSearchBoard({
    apiData: pageItems,
  });

  const handleDetailClick = (itemId: number) => {
    Router.push({
      pathname: pathName.DETAIL,
      query: { id: itemId },
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (categoryId && subCategoryId) {
        const subData = await getSubMicroContent(
          categoryId,
          subCategoryId,
          page
        );
        setPageItems(subData.data);
      } else if (categoryId) {
        const data = await getMicroContent(categoryId, page);
        setPageItems(data.data);
      }
    }
    fetchData();
  }, [categoryId, subCategoryId, page]);

  return (
    <Container>
      {isAdmin && (
        <Link href={`/writing`}>
          <WritingBtn>작성하기</WritingBtn>
        </Link>
      )}
      <Box>
        <Wrapper>
          <MainItemWrapper>
            {pageItems.childList.length === 0 ? (
              <NoPostsMessage>
                {subCategoryId
                  ? `${categoryName} - ${subCategoryName}에 게시물이 없습니다.`
                  : `${categoryName}에 게시물이 없습니다.`}
              </NoPostsMessage>
            ) : (
              pageItems?.childList.map((item: ChildrenList) => (
                <MainItemBox
                  key={item.id}
                  onClick={() => handleDetailClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <MainItemImg>
                    <Image
                      src={
                        item.thumbnail && item.thumbnail !== "none"
                          ? item.thumbnail
                          : "/img/LeicaDefaultImage.png"
                      }
                      alt=""
                      width={200}
                      height={200}
                    />
                  </MainItemImg>
                  <MainItemName $hoveredItem={hoveredItem === item.id}>
                    {item.title}
                  </MainItemName>
                  <MainItemDate>{item.createdAt}</MainItemDate>
                </MainItemBox>
              ))
            )}
          </MainItemWrapper>
        </Wrapper>
      </Box>
      {pageItems.totalElement !== 0 && (
        <PageBoxContainer>
          <PageBox>
            <Page>
              {pageGroups !== 0 && (
                <div
                  onClick={() => {
                    handlePrevGroup(pageGroups);
                  }}
                >
                  <BiSolidLeftArrow size="5" />
                </div>
              )}
              {pages ? (
                pages.map((item: number) => (
                  <PageButton
                    key={item}
                    $isactive={currentPage === item}
                    onClick={() => handlePageChange(item)}
                    value={currentPage}
                  >
                    {item}
                  </PageButton>
                ))
              ) : (
                <></>
              )}
              {pageGroups !== lastPageGroup && (
                <div
                  onClick={() => {
                    handleNextGroup(pageGroups);
                  }}
                >
                  <BiSolidRightArrow size="5" />
                </div>
              )}
            </Page>
          </PageBox>
        </PageBoxContainer>
      )}
    </Container>
  );
};

export default MicroContents;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 966px;
  margin: auto;
`;
const Box = styled.div`
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  justify-content: center;
  padding: 40px 35px;
`;

const Wrapper = styled.div`
  height: auto;
`;

const MainItemWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 30px;
`;
const MainItemBox = styled.div`
  width: 200px;
  height: 299px;
  /* margin: 39px 30px 0px 0px; */
  cursor: pointer;
`;
const MainItemImg = styled.div`
  margin-bottom: 12px;
`;
const MainItemName = styled.div<ItemNameProps>`
  width: 200px;
  height: 63px;
  margin-bottom: 12px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  font-family: "Dotum";
  cursor: pointer;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-decoration: ${(props) => (props.$hoveredItem ? "underline" : "none")};
`;

const MainItemDate = styled.div`
  width: 200px;
  height: 16.8px;
  font-size: 11px;
  font-family: "Dotum";
  color: rgb(146, 146, 146);
`;

const PageBox = styled.div`
  width: 966px;
  height: 60px;
  border: 3px solid rgb(199, 199, 199);
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
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
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
const NoPostsMessage = styled.div`
  margin: 50px auto;
`;
const WritingBtn = styled.button`
  border: 3px solid #dedede;
  padding: 10px;
  border-radius: 10px;
  color: #000;
  background-color: white;
  margin-bottom: 7px;
  &:hover {
    transition: all ease-out 200ms;
    box-shadow: 0px 0px 0px 4px #dedede;
  }
`;
