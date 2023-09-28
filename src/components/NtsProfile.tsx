import Image from "next/image";
import React from "react";
import { styled } from "styled-components";

const NtsProfile = () => {
  return (
    <Container>
      <Image src="/img/main/ntsLogo.png" alt="" width={130} height={90} />
      <ProfileInfoDiv>
        <ProfileInfo>라이카 마이크로시스템즈</ProfileInfo>
        <ProfileInfo>한국지사 공식대리점</ProfileInfo>
      </ProfileInfoDiv>
    </Container>
  );
};

export default NtsProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 171px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  background-color: white;
  padding: 10px;
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 143px;
  margin: 0px 9px 0px 9px;
  font-size: 12px;
  color: rgb(138, 131, 126);
  line-height: 18px;
  font-weight: 700;
`;
