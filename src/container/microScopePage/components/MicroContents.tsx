import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Router from "next/router";
import { pathName } from "@/config/pathName";
import {
  useSearchBoard,
  PagingContent,
} from "../../../hooks/pagenateHook/usePagenate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface PageButtonProps {
  $isactive: boolean;
}

interface ResponseDataItem {
  size: number;
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
  childName: string;
  createdAt : string;
}
interface ItemNameProps {
  $hoveredItem: boolean;
}

const MicroContents = () => {
  const router = useRouter();
  const { category, subCategory } = router.query;
  const [mainItems, setMainItems] = useState<ChildrenList[]>([]);
  const [pageItems, setPageItems] = useState<ResponseDataItem>({
    size: 0, // totalElement로 바뀔예정
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
    apiData:  pageItems ,
  });

 
  const handleDetailClick = (itemId: number) => {
    Router.push({
      pathname: pathName.DETAIL,
      query: { id: itemId },
    });
  };

  useEffect(() => {
    if (category) {
      {
        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/post/${category}?size=16&page=${page-1}`;
        if (subCategory) {
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/post/${category}/${subCategory}?size=16&page=${page-1}`;
        }

        const response = fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setMainItems(data);
            setPageItems(data);
            
          })
          .catch((error) => {
            console.error("게시물을 가져오는 중 오류 발생:", error);
          });
      }
    }
  }, [category, page,  subCategory]);


  return (
    <div>
      <Box>
        <Wrapper>
          <MainItemWrapper>
            {mainItems.length === 0 ? (
              <NoPostsMessage>게시물이 없습니다.</NoPostsMessage>
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
                      src={item.thumbnail}
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
    </div>
  );
};

export default MicroContents;
const Box = styled.div`
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: auto;
  padding: 0px 15px 38px 38px;
`;

const MainItemWrapper = styled.div`
  width: 936px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;
const MainItemBox = styled.div`
  width: 200px;
  height: 299px;
  margin: 39px 30px 0px 0px;
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
const NoPostsMessage = styled.div``;
