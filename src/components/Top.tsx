import React, { useState } from "react";
import styled from "styled-components";
import leicaTypo from "../../public/img/main/ntsrow.png";
import leicaTypo2 from "../../public/img/main/leicalogo.png";
import YoutubeLink from "../../public/img/main/youtube.png";
import Image from "next/image";
import topPicture from "../../public/img/main/topPicture.png";
import microScope from "../../public/img/main/microScope.png";
import Router from "next/router";
import { pathName } from "@/config/pathName";
import BusinessInfoBox from "./BusinessInfoBox";
import NtsProfile from "./NtsProfile";

const Top: React.FC = () => {
  const [hovered, sethovered] = useState(false);

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
      <FixedRight>
        <EstimateBox
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          $hovered={hovered}
          onClick={() => {
            Router.push(pathName.ESTIMATE);
          }}
        >
          <EstimateImage>
            <Image width={30} height={30} alt={""} src={microScope} />
          </EstimateImage>
          <EstimateSpan>견적 및 서비스 문의</EstimateSpan>
          {hovered && (
            <EstimateMessage>
              문의 사항이 있으신가요?
              <br />
              클릭해주세요!
            </EstimateMessage>
          )}
        </EstimateBox>
        <NtsProfile />
        <BusinessInfoBox />
        <YoutubeDiv>
          <a
            href="https://www.youtube.com/user/LeicaMicrosystems"
            target="_blank"
          >
            <Image width={155} height={30} src={YoutubeLink} alt="" />
          </a>
        </YoutubeDiv>
      </FixedRight>
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
const YoutubeDiv = styled.div`
  padding: 5px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;
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
