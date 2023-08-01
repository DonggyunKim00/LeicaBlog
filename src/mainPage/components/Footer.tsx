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
          src="/img/main/footer/LeicaCard.jpg"
          alt=""
          width={400}
          height={248}
        />
      </Youtube>
      {/* <FaceBook>
        <Image
          src="/img/main/footer/facebook.png"
          alt=""
          width={170}
          height={36}
        />
      </FaceBook> */}
      <BusinesssInfoBox>
        <BusinessInfo>
          <InfoTitleBox>
            <InfoTitle>사업자 정보</InfoTitle>
            <InfoTitleBtn>조회 ▶</InfoTitleBtn>
          </InfoTitleBox>

          <InfoLi>
            <InfoLiTitle>· 상호 :</InfoLiTitle>
            <InfoLiContent>라이카마이크로시스템</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 대표 :</InfoLiTitle>
            <InfoLiContent>이정록</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 주소 :</InfoLiTitle>
            <InfoLiContent>서울특별시 강남구 영동대로 741(청담동)6층</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 전화 :</InfoLiTitle>
            <InfoLiContent>02-3416-4430</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 메일 :</InfoLiTitle>
            <InfoLiContent>leica_micro@naver.com</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 사업자번호 :</InfoLiTitle>
            <InfoLiContent>120-84-01055</InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 이용약관 :</InfoLiTitle>
            <InfoLiContent>이용약관 보기  </InfoLiContent>
          </InfoLi>
          <InfoLi>
            <InfoLiTitle>· 총신판매번호 :</InfoLiTitle>
            <InfoLiContent>신고면제</InfoLiContent>
          </InfoLi>
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
  height: 320.8px;
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
  width: 400px;
  height: 250px;
  margin-left: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px solid;
  border-color: rgb(233, 233, 233);
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
  border-color: rgb(211, 211, 211);
`;

const BusinessInfo = styled.div`
  width: 147px;
  height: 191px;
  padding: 12px 10px 9px 10px;
`;
const InfoTitleBox = styled.div`
  width: 147px;
  height: 26px;
  border-bottom: 1px solid;
  border-color: rgb(211, 211, 211);
  margin: auto;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
  color: rgb(37, 37, 37);
`;

const InfoTitleBtn = styled.div`
  width: 40px;
  height: 12px;
  border: 1px solid;
  border-color: rgb(189, 189, 189);
  margin-bottom: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: rgb(81, 81, 81);
  white-space: nowrap;
  margin-left: 40px;
`;
const InfoLi = styled.div`
  width: 160px;
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`;

const InfoLiTitle = styled.div`
  font-size: 11px;
  color: rgb(150, 150, 150);
  word-break: break-word;
`;

const InfoLiContent = styled.div`
  font-size: 11px;
  margin-left: 2px;
  word-break: break-word;
`;
