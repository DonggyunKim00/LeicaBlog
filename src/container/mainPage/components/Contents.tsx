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
interface ParentCategory {
  parentId: number;
  parentName: string;
}

const Contents = () => {
  const [mainItems, setMainItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<Item[]>([]);
  const [parentCategories, setParentCategories] = useState<ParentCategory[]>(
    []
  );
  const LASTID =
    parentCategories.length > 0
      ? parentCategories[parentCategories.length - 1].parentId
      : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/post`
        );
        const mainData = await mainResponse.json();

        if (Array.isArray(mainData.childList)) {
          setMainItems(mainData.childList);
        }
      } catch (error) {
        console.error("메인 아이템을 가져오는 중 오류 발생:", error);
      }
      if (LASTID !== null)
        try {
          const subResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/post/${LASTID}?size=6&page=0`
          );
          const subData = await subResponse.json();

          if (Array.isArray(subData.childList)) {
            setSubItems(subData.childList);
          }
        } catch (error) {
          console.error("서브 아이템을 가져오는 중 오류 발생:", error);
        }

      try {
        const parentCategoryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category/parent`
        );
        const parentCategoryData = await parentCategoryResponse.json();

        setParentCategories(parentCategoryData);
      } catch (error) {
        console.error("부모 카테고리를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [LASTID]);

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
          <MainItemBox onClick={() => handleDetailClick(item.id)} key={item.id}>
            <MainItemImg>
              <Image
                src={
                  item.thumbnail && item.thumbnail !== "none"
                    ? item.thumbnail
                    : "/img/LeicaDefaultImage.png"
                }
                alt=""
                width={180}
                height={185}
              />
            </MainItemImg>
            <MainItemName>{item.title}</MainItemName>
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
            onClick={() => handleDetailClick(subItem.id)}
          >
            <SubItemImg>
              {subItem.thumbnail && subItem.thumbnail !== "none" ? (
                <Image src={subItem.thumbnail} alt="" width={90} height={90} />
              ) : (
                <Image
                  src={"/img/LeciaDefaultImage.png"}
                  alt=""
                  width={90}
                  height={90}
                />
              )}
            </SubItemImg>
            <SubItemSpan>
              <SubItemName>{subItem.title}</SubItemName>
              <SubItemContent>{subItem.content}</SubItemContent>
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
const MainItemName = styled.div`
  width: 180px;
  height: 16px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Dotum";
  &:hover {
    text-decoration: underline;
  }
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

const SubItemName = styled.div`
  width: 193px;
  height: 20px;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Dotum";
  &:hover {
    text-decoration: underline;
  }
`;

const SubItemContent = styled.div`
  width: 193px;
  height: 48px;
  font-size: 12px;
  font-family: "Dotum";
  color: rgb(37, 37, 37);
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`;

const SubItemDate = styled.div`
  width: 193px;
  height: 12.8px;
  padding-top: 4px;
  font-size: 11px;
  font-family: "Dotum";
  color: rgb(146, 146, 146);
`;
