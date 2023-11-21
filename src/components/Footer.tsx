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
