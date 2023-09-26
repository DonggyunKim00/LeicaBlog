import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Router from "next/router";
import { pathName } from "@/config/pathName";

interface Item {
  id: number;
  thumbnail: string | null;
  title: string;
  content: string;
  createdAt: number;
}
interface MainItemNameProps {
  $isHovered: boolean;
}

const Contents = () => {
  const [mainItems, setMainItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<Item[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
        const responseData = await response.json();

        if (Array.isArray(responseData.childList)) {
          const sortedData = responseData.childList.slice().reverse();
          const mainData = sortedData.slice(0, 5);
          const subData = sortedData.slice(5, 11);

          setMainItems(mainData);
          setSubItems(subData);
        } else {
          // 데이터가 배열이 아닌 경우 처리
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  const handleDetailClick = (itemId: number) => {
    Router.push({
      pathname: pathName.DETAIL,
      query: { id: itemId },
    });
  };

  return (
    <Wrapper>
      <MainItemWrapper>
        {mainItems.map((item) => (
          <MainItemBox
            onClick={() => handleDetailClick(item.id)}
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <MainItemImg>
              {item.thumbnail && item.thumbnail !== "none" ? (
                <Image src={item.thumbnail} alt="" width={180} height={185} />
              ) : (
                <Image
                  src={"/img/main/header.png"}
                  alt=""
                  width={180}
                  height={185}
                />
              )}
            </MainItemImg>
            <MainItemName $isHovered={hoveredItem === item.id}>
              {item.title}
            </MainItemName>
            <MainItemDate>
              {new Date(item.createdAt).toLocaleDateString()}
            </MainItemDate>
          </MainItemBox>
        ))}
      </MainItemWrapper>
      <Line />
      <SubItemTitle>- 라이카 news</SubItemTitle>

      <SubItemWrapper>
        {subItems.map((subItem) => (
          <SubItemBox
            key={subItem.id}
            onMouseEnter={() => setHoveredItem(subItem.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleDetailClick(subItem.id)}
          >
            <SubItemImg>
              {subItem.thumbnail && subItem.thumbnail !== "none" ? (
                <Image src={subItem.thumbnail} alt="" width={90} height={90} />
              ) : (
                <Image
                  src={"/img/main/header.png"}
                  alt=""
                  width={90}
                  height={90}
                />
              )}
            </SubItemImg>
            <SubItemSpan>
              <SubItemName $isHovered={hoveredItem === subItem.id}>
                {subItem.title}
              </SubItemName>
              <SubItemContent $isHovered={hoveredItem === subItem.id}>
                {subItem.content}
              </SubItemContent>
              <SubItemDate>
                {new Date(subItem.createdAt).toLocaleDateString()}
              </SubItemDate>
            </SubItemSpan>
          </SubItemBox>
        ))}
      </SubItemWrapper>
    </Wrapper>
  );
};

export default Contents;

const Wrapper = styled.div`
  width: 966px;
  height: 527.2px;
  margin: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 15px;
`;

const MainItemWrapper = styled.div`
  width: 936px;
  height: 240px;
  display: flex;
  flex-wrap: wrap;
`;
const MainItemBox = styled.div`
  width: 180px;
  height: 240px;
  margin-right: 5px;
  cursor: pointer;
`;
const MainItemImg = styled.div`
  margin-bottom: 12px;
`;
const MainItemName = styled.div<MainItemNameProps>`
  width: 180px;
  height: 16px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Dotum";
  text-decoration: ${(props) => (props.$isHovered ? "underline" : "none")};
`;
const MainItemDate = styled.div`
  width: 180px;
  height: 16.8px;
  font-size: 11px;
  font-family: "Dotum";
  color: rgb(146, 146, 146);
`;

const Line = styled.div`
  width: 936px;
  height: 26px;
  margin: auto;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    width: 936px;
    height: 2px;
    background-color: rgb(199, 199, 199);
  }
`;

const SubItemTitle = styled.div`
  width: 936px;
  height: 18px;
  padding-bottom: 5px;
  font-size: 13px;
  font-family: "Dotum";
  font-weight: 600;
`;

const SubItemWrapper = styled.div`
  width: 936px;
  height: auto;
  margin-top: 3px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const SubItemBox = styled.div`
  width: 308px;
  height: 120px;
  cursor: pointer;
  display: flex;
`;
const SubItemImg = styled.div`
  width: 90px;
  height: 90px;
  padding-bottom: 10px;
  margin-right: 10px;
`;
const SubItemSpan = styled.div`
  width: 193px;
  height: 85.6px;
  padding: 5px 15px 6px 0px;
`;

const SubItemName = styled.div<MainItemNameProps>`
  width: 193px;
  height: 20px;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Dotum";
  text-decoration: ${(props) => (props.$isHovered ? "underline" : "none")};
`;

const SubItemContent = styled.div<MainItemNameProps>`
  width: 193px;
  height: 48px;
  font-size: 12px;
  font-family: "Dotum";
  color: rgb(37, 37, 37);
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${(props) => (props.$isHovered ? "underline" : "none")};
`;

const SubItemDate = styled.div`
  width: 193px;
  height: 12.8px;
  padding-top: 4px;
  font-size: 11px;
  font-family: "Dotum";
  color: rgb(146, 146, 146);
`;
