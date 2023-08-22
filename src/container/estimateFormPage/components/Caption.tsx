import React from "react";
import Image from "next/image";
import caption from "../../../../public/img/estimate/caption.webp";
import styled from "styled-components";

const Caption = () => {
  return (
    <Wrapper>
      <ImageBox>
        <Image src={caption} width={650} height={280.95} alt={""} />
      </ImageBox>
      <H1>라이카 견적 및 서비스 문의</H1>
      <Span>
        우측 양식을 작성해 주시면, 조속히 요청하신 사항에 대해 연락을 드리도록
        하겠습니다. Comment 란에 제품명, 모델명 및 자세한 요청사항 등을 기입해
        주시면 좀 더 정확하고 빠른 서비스를 제공 받으실 수 있습니다.
      </Span>
      <H2>Leica 제품 자세히 보기</H2>
      <Span>
        Leica Microsystems는 일반 현미경, 공초점 레이저 현미경, 이미징 시스템,
        샘플 전처리 장비, 의료 장비 사업 분야에서 시장을 선도합니다. 시스템이
        모듈식이므로 사용자 고유의 니즈에 맞추어 시스템을 구성할 수 있습니다.{" "}
      </Span>
      <Button>LEICA 제품 자세히 보기</Button>
      <H2>(주) 라이카코리아</H2>
      <Span>서울시 강남구 영동대로 741 (청담동) 은성빌딩 6층</Span>
      <Span>Tel 02-3416-4430 | Fax 02-514-6548</Span>
    </Wrapper>
  );
};

export default Caption;

const Wrapper = styled.div`
  margin-right: 50px;
`;

const ImageBox = styled.div`
  width: 650px;
  height: 280.95px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 40px;
`;
const H1 = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Span = styled.div`
  width: 650px;
  line-height: 1.5;
  margin-bottom: 40px;
`;
const H2 = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom : 40px;
`;