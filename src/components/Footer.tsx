import React, { useState } from "react";
import styled from "styled-components";
import YoutubeLink from "../../public/img/main/youtube.png";
import microScope from "../../public/img/main/microScope.png";
import BusinessInfoBox from "./BusinessInfoBox";
import NtsProfile from "./NtsProfile";
import { pathName } from "@/config/pathName";
import { useRouter } from "next/router";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  const [hovered, sethovered] = useState(false);

  const handleMouseEnter = () => {
    sethovered(true);
  };
  const handleMouseLeave = () => {
    sethovered(false);
  };
  return (
    <Wrapper>
      <FixedRight>
        <NtsProfile />
        <EstimateBox
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          $hovered={hovered}
          onClick={() => {
            router.push(pathName.ESTIMATE);
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
        <YoutubeDiv>
          <a
            href="https://www.youtube.com/user/LeicaMicrosystems"
            target="_blank"
          >
            <Image width={155} height={30} src={YoutubeLink} alt="" />
          </a>
        </YoutubeDiv>
        <BusinessInfoBox />
      </FixedRight>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  margin-top: 50px;
  @media (max-width: 1380px) {
    width: 966px;
    margin: 30px auto 0px;
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
  @media (max-width: 1380px) {
    position: static;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
const YoutubeDiv = styled.div`
  padding: 5px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;
