import React, { useEffect, useState } from "react";
import styled from "styled-components";
import leicaTypo from "../../public/img/main/ntsrow.png";
import leicaTypo2 from "../../public/img/main/leicalogo.png";
import Image from "next/image";
import topPicture from "../../public/img/main/topPicture.png";
import Router from "next/router";
import { pathName } from "@/config/pathName";
import BusinessInfoBox from "./BusinessInfoBox";
import NtsProfile from "./NtsProfile";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const Top: React.FC = () => {
  const [hovered, sethovered] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleMouseEnter = () => {
    sethovered(true);
  };

  const handleMouseLeave = () => {
    sethovered(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    Router.push({
      pathname: pathName.MICROSCOPE,
      query: { category: categoryName },
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/category/parent`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };
    fetchCategories();
  }, []);

  const emptyBoxes: Array<{ showafter: boolean }> = new Array(8-categories.length)
    .fill("")
    .map((_, index, array) => ({
      showafter: index === array.length - 1 ? false : true,
    }));

  return (
    <>
      <LeicaTypoBox>
        <LeicaTypo
          onClick={() => {
            Router.push(pathName.MAIN);
          }}
        >
          <Image width={300} height={50} alt={""} src={leicaTypo} />
        </LeicaTypo>
      </LeicaTypoBox>
      <ContentWrapper>
        <Image width={917} height={500} alt={""} src={topPicture} />
        <AbsoluteImg width={220} height={100} alt={""} src={leicaTypo2} />
      </ContentWrapper>
      <ScopeMenuWrapper>
        {categories.map((category, index) => (
          <ScopeMenuBox
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            showafter={index === 3 || index === 7 ? false : true}
          >
            {category.name}
          </ScopeMenuBox>
        ))}{" "}
        {emptyBoxes.map((emptyBox, index) => (
          <EmptyScopeMenuBox key={index} showafter={emptyBox.showafter} />
        ))}
      </ScopeMenuWrapper>
    </>
  );
};

export default Top;

const AbsoluteImg = styled(Image)`
  position: absolute;
  right: -40px;
  top: -5px;
`;
const LeicaTypoBox = styled.div`
  display: flex;
  width: 917px;
  margin: 15px auto;
`;
const LeicaTypo = styled.div`
  width: 160px;
  &:hover {
    cursor: pointer;
  }
`;
const ContentWrapper = styled.div`
  width: 920px;
  height: 500px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
`;

const ScopeMenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 914px;
  margin: 0 auto;
  background-color: #eeeeee;
  position: relative;
  margin-bottom: 57px;
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ced1d3;
  }
`;
const ScopeMenuBox = styled.div<{ showafter: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 80px;
  cursor: pointer;
  background-color: #eeeeee;
  color: #84949d;
  font-weight: 600;
  transition: background-color 0.3s;
  text-align: center;
  font-size: 19px;
  z-index: 0;

  &:hover {
    background-color: #b3babd;
  }

  ${(props) =>
    props.showafter &&
    `
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0px;
        height: 68%;
        width: 2px;
        background-color:  #b3babd;
        transform: translateY(-50%);
      }
    `}
`;
const EmptyScopeMenuBox = styled.div<{ showafter: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 80px;
  background-color: #eeeeee;
  color: #84949d;
  font-weight: 600;
  text-align: center;
  font-size: 19px;
  z-index: 0;

  ${(props) =>
    props.showafter &&
    `
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0px;
        height: 68%;
        width: 2px;
        background-color:  #b3babd;
        transform: translateY(-50%);
      }
    `}
`;
const EstimateBox = styled.div<{ $hovered: boolean }>`
  width: 170px;
  height: ${(props) => (props.$hovered ? "140px" : "100px")};
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  background-color: white;
  transition: height 0.3s;
  &:hover {
    height: 140px;
    cursor: pointer;
  }
`;
const EstimateImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px 10px 0px;
`;

const EstimateSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10x;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: -1.4px;
  color: #686868;
  margin-top: 10px;
  margin-bottom: 14px;
`;

const EstimateMessage = styled.div`
  font-size: 14px;
  color: #686868;
  display: flex;
  justify-content: center;
`;

const FixedRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 80px;
  right: 2%;
`;