import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Middle = () => {
  const dummyData = [
    {
      id: 1,
      imgSrc: "/img/main/middle/1.png",
      name: "검사 효율성을 최적화하기 위한 방법",
      date: "2023. 7. 6.",
    },
    {
      id: 2,
      imgSrc: "/img/main/middle/2.png",
      name: "안구 천공(Ocular 어쩌고 어쩌고)",
      date: "2023. 7. 5.",
    },
    {
      id: 3,
      imgSrc: "/img/main/middle/3.png",
      name: "[소식] 이제 새로운 메이플이 시작된다",
      date: "2023. 6. 29.",
    },
    {
      id: 4,
      imgSrc: "/img/main/middle/4.png",
      name: "단일 Depletion lasputin lol",
      date: "2023. 6. 29.",
    },
    {
      id: 5,
      imgSrc: "/img/main/middle/5.png",
      name: "망막하 유전자 치료 너무나 비싼것으로 밝혀져",
      date: "2023. 6. 26.",
    },
  ];

  
  const dummySubItems = [
    {
      id: 1,
      imgSrc: "/img/main/middle/s1.png",
      name: "[소식] 김성훈 스쿼트 140 3트에 모두 실패해.....",
      content: "김효성과 하체운동을 하는도중 스쿼트 기록 갱신에 도전했지만 3번 모두 실패하는 모습을 보여.....",
      date: "2023. 06. 23.",
    },
    {
      id: 2,
      imgSrc: "/img/main/middle/s2.png",
      name: "[소식] 김동균 벤치 90도 못들어....충격...",
      content: "김효성과의 가슴운동중 벤치 90에 깔리는 참사가 발생에 중상자 1명발생 (김효성 배꼽이 빠져 응급실로 이송)'",
      date: "2023. 6. 16.",
    },
    {
      id: 3,
      imgSrc: "/img/main/middle/s3.png",
      name: "[소식] 김효성 스쿼트 1RM 25KG으로 밝혀져 세간의 주목을 받고 있다고...",
      content:"대퇴사두 보다 대흉근이 강하다고 알려져 충격",
      date: "2023. 6. 10.",
    },
    {
      id: 4,
      imgSrc: "/img/main/middle/s4.png",
      name: "[소식] 강혜미 3대 700KG 달성으로 제2의 장미란 발굴.",
      content: "엄청난 근육과 함께 엄청난 식사량을 자랑 ",
      date: "2023. 5. 30.",
    },
    {
      id: 5,
      imgSrc: "/img/main/middle/s5.png",
      name: "[소식] 대한미세수술학회...",
      content:
        "대한미세수술학회 대한수부외과학회 대한말초신경수술학회 2023 합동 심포지...",
      date: "2023. 5. 22.",
    },
    {
      id: 6,
      imgSrc: "/img/main/middle/s6.png",
      name: "[소식] 대한성형외과학회에...",
      content:
        "제 13회 대한성형외과학회 기초재건성형 학술대회 전시 참가 지난 5월12...",
      date: "2023. 5. 19.",
    },
  ];
  return (
    <Wrapper>
      <MainItemWrapper>
        {dummyData.map((item) => (
          <MainItemBox key={item.id}>
            <MainItemImg>
              <Image src={item.imgSrc} alt="" width={180} height={185} />
            </MainItemImg>
            <MainItemName>{item.name}</MainItemName>
            <MainItemDate>{item.date}</MainItemDate>
          </MainItemBox>
        ))}
      </MainItemWrapper>
      <Line />
      <SubItemTitle>- 라이카 뉴스</SubItemTitle>

      <SubItemWrapper>
        {dummySubItems.map((subItem) => (
          <SubItemBox key={subItem.id}>
            <SubItemImg>
              <Image
                src={subItem.imgSrc}
                alt=""
                width={90}
                height={90}
              />
            </SubItemImg>
            <SubItemSpan>
              <SubItemName>{subItem.name}</SubItemName>
              <SubItemContent>{subItem.content}</SubItemContent>
              <SubItemDate>{subItem.date}</SubItemDate>
            </SubItemSpan>
          </SubItemBox>
        ))}
      </SubItemWrapper>
    </Wrapper>
  );
};

export default Middle;

const Wrapper = styled.div`
  width: 936px;
  height: 527.2px;
  margin: auto;
  border: 2px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 15px;
`;

const MainItemWrapper = styled.div`
  width: 936px;
  height: 240px;
  display: flex;
  justify-content: space-between;
`;
const MainItemBox = styled.div`
  width: 180px;
  height: 240px;
`;
const MainItemImg = styled.div`
  margin-bottom: 12px;
`;
const MainItemName = styled.div`
  width: 180px;
  height: 16px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MainItemDate = styled.div`
  width: 180px;
  height: 16.8px;
  font-size: 11px;
`;

const Line = styled.div`
  width: 936px;
  height: 26px;
  margin: auto;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    width: 936px;
    height: 1.5px;
    background-color: rgb(199, 199, 199);
  }
`;

const SubItemTitle = styled.div`
  width: 936px;
  height: 18px;
  padding-bottom: 5px;
  font-size: 13px;
  font-family: "Dotum";
  font-weight: 600;
`;

const SubItemWrapper = styled.div`
  width: 936px;
  height: auto; /* Adjust the height to allow wrapping */
  margin-top: 3px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap; /* Allow flex items to wrap */
`;

const SubItemBox = styled.div`
  width: 308px;
  height: 120px;
  display: flex;
`;
const SubItemImg = styled.div`
  width: 90px;
  height: 90px;
  padding-bottom: 10px;
  margin-right: 10px;
`;
const SubItemSpan = styled.div`
  width: 193px;
  height: 85.6px;
  padding: 5px 15px 6px 0px;
`;

const SubItemName = styled.div`
  width: 193px;
  height: 20px;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubItemContent = styled.div`
  width : 193px;
  height: 48px;
  font-size : 12px;
  font-family: "Dotum";
  color : rgb(37, 37, 37);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 텍스트 줄 수 제한 */
  -webkit-box-orient: vertical;
  

`

const SubItemDate = styled.div`
  width: 193px;
  height: 12.8px;
  padding-top: 4px;
  font-size: 11px;
  font-family: "Dotum";
  color : rgb(146, 146, 146)
`;
