import React from "react";
import styled from "styled-components";
import leicaTypo from "../../public/img/main/ntsrow.png";
import leicaTypo2 from "../../public/img/main/leicalogo.png";
import Image from "next/image";
import topPicture from "../../public/img/main/topPicture.png";
import Router from "next/router";
import { pathName } from "@/config/pathName";

const Top: React.FC = () => {
  const handleCategoryClick = (categoryName: string) => {
    Router.push({
      pathname: pathName.MICROSCOPE,
      query: { category: categoryName },
    });
  };
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
        <ScopeMenuBox onClick={() => handleCategoryClick("광학 현미경")}>
          광학 현미경
        </ScopeMenuBox>
        <ScopeMenuBox
          onClick={() => handleCategoryClick("공초점레이저 현미경")}
        >
          공초점레이저 현미경
        </ScopeMenuBox>
        <ScopeMenuBox onClick={() => handleCategoryClick("디지털 현미경")}>
          디지털 현미경
        </ScopeMenuBox>
        <ScopeMenuBox onClick={() => handleCategoryClick("현미경 카메라")}>
          현미경 카메라
        </ScopeMenuBox>
        <ScopeMenuBox2 onClick={() => handleCategoryClick("수술용 현미경")}>
          수술용 현미경
        </ScopeMenuBox2>
      </ScopeMenuWrapper>
      <ScopeMenuWrapper2>
        <ScopeMenuBox onClick={() => handleCategoryClick("수퍼해상도 현미경")}>
          수퍼해상도 현미경
        </ScopeMenuBox>
        <ScopeMenuBox
          onClick={() => handleCategoryClick("실체현미경 마크로 현미경")}
        >
          실체현미경
          <br />
          마크로 현미경
        </ScopeMenuBox>
        <ScopeMenuBox onClick={() => handleCategoryClick("현미경 소프트웨어")}>
          현미경 소프트웨어
        </ScopeMenuBox>
        <ScopeMenuBox
          onClick={() => handleCategoryClick("전자현미경 시료전처리")}
        >
          전자현미경 <br />
          시료전처리
        </ScopeMenuBox>
        <ScopeMenuBox2 onClick={() => handleCategoryClick("교육용 현미경")}>
          교육용 현미경
        </ScopeMenuBox2>
      </ScopeMenuWrapper2>
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
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 914px;
  margin: 0 auto;
  background-color: #eeeeee;
  border-bottom: 2px dotted #ced1d3;
`;

const ScopeMenuWrapper2 = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 914px;
  margin: 0 auto;
  background-color: #eeeeee;
  margin-bottom: 57px;
`;

const ScopeMenuBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 181.8px;
  height: 80px;
  cursor: pointer;
  background-color: #eeeeee;
  transition: background-color 0.3s;
  color: #84949d;
  font-weight: 600;
  transition: background-color 0.3s;
  text-align: center;
  font-size: 19px;

  &:hover {
    background-color: #b3babd;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -2px;
    height: 68%;
    width: 2px;
    background-color: #ced1d3;
    transform: translateY(-50%);
  }
`;

const ScopeMenuBox2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 182.8px;
  height: 80px;
  cursor: pointer;
  background-color: #eeeeee;
  transition: background-color 0.3s;
  color: #84949d;
  font-weight: 600;
  transition: background-color 0.3s;
  text-align: center;
  font-size: 19px;

  &:hover {
    background-color: #b3babd;
  }
`;
