import React from "react";
import styled from "styled-components";
import leicaTypo from "../../../public/img/main/leicaTypo.jpg";
import Image from "next/image";
import topPicture from "../../../public/img/main/topPicture.png";
const Top: React.FC = () => {
  return (
    <div>
      <Wrapper>
        <LeicaTypo>
          <Image width={160} height={100} alt={""} src={leicaTypo} />
        </LeicaTypo>
      
        <ContentWrapper>
          <Image width={917} height={500} alt={""} src={topPicture} />
        </ContentWrapper>
        <ScopeMenuWrapper>
          <ScopeMenuBox>광학 현미경</ScopeMenuBox>
          <ScopeMenuBox>공초점레이저 현미경</ScopeMenuBox>
          <ScopeMenuBox>디지털 현미경</ScopeMenuBox>
          <ScopeMenuBox>현미경 카메라</ScopeMenuBox>
          <ScopeMenuBox2>수술용 현미경</ScopeMenuBox2>
        </ScopeMenuWrapper>
        <ScopeMenuWrapper2>
          <ScopeMenuBox>수퍼해상도 현미경</ScopeMenuBox>
          <ScopeMenuBox>
            실체현미경
            <br />
            마크로 현미경
          </ScopeMenuBox>
          <ScopeMenuBox>현미경 소프트웨어</ScopeMenuBox>
          <ScopeMenuBox>
            전자현미경 <br />
            시료전처리
          </ScopeMenuBox>
          <ScopeMenuBox2>교육용 현미경</ScopeMenuBox2>
        </ScopeMenuWrapper2>
      </Wrapper>
    </div>
  );
};

export default Top;

const Wrapper = styled.div`
  display: flexbox;
`;
const MenuBox = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  border: 1px solid black;
`;

const MenuName2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10x;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: -1.4px;
  color: #686868;
`;
const LeicaTypo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
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
  right: 2px;
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
