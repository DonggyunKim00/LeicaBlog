import React from "react";
import styled from "styled-components";
import Image from "next/image";
const Footer = () => {
  return (
    <Wrapper>
      <Profile>
        <ProfileBox>
          <Image
            src="/img/main/footer/LeicaProfile.png"
            alt=""
            width={155}
            height={155}
          />
          <ProfileName>라이카코리아</ProfileName>
          <ProfileInfo>
            라이카 마이크로시스템즈
            <br />
            Leica Microsysyems
            <br />
            한국지사 공식블로그
            <br /> <br />• 02-3416-4430
          </ProfileInfo>
        </ProfileBox>
      </Profile>
      <Youtube>
        <Image
          src="/img/main/footer/youtube.png"
          alt=""
          width={170}
          height={36}
        />
      </Youtube>
      <FaceBook>
        <Image
          src="/img/main/footer/facebook.png"
          alt=""
          width={170}
          height={36}
        />
      </FaceBook>
      <BusinesssInfoBox>
            <BusinessInfo>
                <InfoTitle>
                    사업자 정보
                </InfoTitle>
            </BusinessInfo>
      </BusinesssInfoBox>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 966px;
  height: 391.8px;
  padding-bottom: 10px;
  margin: 16px auto 0;
  display: flex;
`;
const Profile = styled.div`
  width: 171px;
  height: 390.8px;
  margin-left: 8px;
  border: 1px solid;
  border-color: rgb(233, 233, 233);
  border-radius: 5px;
`;
const ProfileBox = styled.div`
  margin: 8px 5px 6px 5px;
  width: 141px;
  height: 376.8px;
`;
const ProfileName = styled.div`
  width: 143px;
  height: 22px;
  padding-top: 12px;
  margin: 0px 9px 0px 9px;
  color: rgb(138, 131, 126);
  font-size: 14px;
  font-weight: 600;
`;
const ProfileInfo = styled.div`
  width: 143px;
  height: 90px;
  margin: 0px 9px 0px 9px;
  padding-top: 10px;
  font-size: 12px;
  color: rgb(138, 131, 126);
  line-height: 18px;
`;
const Youtube = styled.div`
  width: 170px;
  height: 62px;
  margin-left: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const FaceBook = styled.div`
  width: 170px;
  height: 62px;
  margin-left: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const BusinesssInfoBox = styled.div`
  width: 171px;
  height: 212px;
  margin-left: 16px;
  border: 1px solid;
  border-color : rgb(211, 211, 211);
`;


const BusinessInfo = styled.div`
    width: 147px;
    height: 191px;
    padding :12px 11px 9px 11px;
`
const InfoTitle = styled.div`
width : 147px;
height : 26px;
font-size : 12px;
font-weight : 600;
border-bottom: 1px solid;
border-color : rgb(211, 211, 211);
margin-bottom: 5px;
`