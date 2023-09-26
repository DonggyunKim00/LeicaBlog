import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Router from "next/router";
import { pathName } from "@/config/pathName";

interface PageButtonProps {
  $isactive: boolean;
}
interface ResponseDataItem {
  size: number;
  childList: ChildrenList[];
}
interface ChildrenList {
  id: number;
  title: string;
  subTitle: string;
  thumbnail: string;
  category: string;
}
interface ItemNameProps {
  hoveredItem: boolean;
}

const MicroContents = () => {
  const router = useRouter();
  const { category } = router.query;
  const [mainItems, setMainItems] = useState<ResponseDataItem[]>([]);
  const [hoveredItem,setHoveredItem] = useState<Number | null>();
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find/post/${category}`
      );
      const responseData = await response.json();

      setMainItems(responseData.childList);
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(Math.ceil(mainItems.length / itemsPerPage), 1);

  const getPaginatedData = (data: any) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const currentItems = getPaginatedData(mainItems).reverse();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleDetailClick = (itemId: number) => {
    Router.push({
      pathname: pathName.DETAIL,
      query: { id: itemId },
    });
  };

  return (
    <div>
      <Box>
        <Wrapper>
          <MainItemWrapper>
            {currentItems.length === 0 ? (
              <NoPostsMessage>게시물이 없습니다.</NoPostsMessage>
            ) : (
              currentItems.map((item: ChildrenList) => (
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
                  <MainItemName hoveredItem={hoveredItem===item.id}>{item.subTitle}</MainItemName>
                  <MainItemDate>date of item</MainItemDate>
                </MainItemBox>
              ))
            )}
          </MainItemWrapper>
        </Wrapper>
      </Box>
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
  cursor : pointer;
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
  text-decoration: ${(props) => (props.hoveredItem ? "underline" : "none")};
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
