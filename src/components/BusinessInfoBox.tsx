import React from 'react';
import { styled } from 'styled-components';

const BusinessInfoBox = () => {
  return (
    <Container>
      <InfoTitleBox>
        <InfoTitle>사업자 정보</InfoTitle>
      </InfoTitleBox>
      <InfoUl>
        <InfoLi>
          <InfoLiTitle>· 상호 :</InfoLiTitle>
          <InfoLiContent>엔티에스</InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 대표 :</InfoLiTitle>
          <InfoLiContent>김영길</InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 본점 :</InfoLiTitle>
          <InfoLiContent>
            대전광역시 유성구 테크노2로 314, 202-1호
            <br />
            (탑립동)
          </InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 경기 :</InfoLiTitle>
          <InfoLiContent>
            경기도 안산시 상록구 해양3로 15 그랑시티 시그니처타워 1106호
          </InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 메일 :</InfoLiTitle>
          <InfoLiContent>jajaekwa@naver.com</InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 휴대전화 :</InfoLiTitle>
          <InfoLiContent>010-6778-5445</InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 전화 :</InfoLiTitle>
          <InfoLiContent>042-931-1012</InfoLiContent>
        </InfoLi>
        <InfoLi>
          <InfoLiTitle>· 사업자번호 :</InfoLiTitle>
          <InfoLiContent>134-10-57561</InfoLiContent>
        </InfoLi>
      </InfoUl>
    </Container>
  );
};

export default BusinessInfoBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 171px;
  border: 3px solid rgb(199, 199, 199);
  padding: 10px 11px;
  background-color: white;
  border-radius: 5px;
`;

const InfoTitleBox = styled.div`
  height: 26px;
  border-bottom: 1px dotted rgb(211, 211, 211);
  margin-bottom: 10px;
`;
const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 3px 0px 10px;
  color: rgb(37, 37, 37);
`;
const InfoUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const InfoLi = styled.div`
  display: flex;
  gap: 4px;
`;

const InfoLiTitle = styled.div`
  min-width: 32px;
  font-size: 11px;
  color: rgb(150, 150, 150);
`;

const InfoLiContent = styled.div`
  font-size: 11px;
  word-break: break-word;
`;
