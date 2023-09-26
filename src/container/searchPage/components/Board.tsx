import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export interface BoardProps {
  id: number;
  title: string;
  thumbnail: string;
  subTitle: string | null;
  childName: string;
  content: string;
  createTime?: string;
}
const Board = ({ ...props }: BoardProps) => {
  const router = useRouter();
  const { id, thumbnail, title, childName, content, createTime } = props;

  const [titleRegData, setTitleRegData] = useState<string>("");
  const [mainRegData, setMainRegData] = useState<string>("");

  // 원하는 쿼리 => keyword
  useEffect(() => {
    const keyword = router.query.keyword?.toString();
    if (keyword) {
      const regex = new RegExp(keyword, "gi"); // 'gi' 플래그는 대소문자 구분 없이 전체 텍스트에서 찾음
      const titleMatches = title.replaceAll(
        regex,
        `<strong>${keyword}</strong>`
      );
      setTitleRegData(titleMatches);
      const mainMatches = content.replaceAll(
        regex,
        `<strong>${keyword}</strong>`
      );
      setMainRegData(mainMatches);
    }
  }, [router, content, title]);
  return (
    <Container>
      <RightCont>
        <ImgWrapper href={`/Detail?id=${id}`}>
          <Image src={thumbnail} width={68} height={68} alt="" />
        </ImgWrapper>
        <TextContent>
          <Top>
            <Title
              href={`/${id}`}
              dangerouslySetInnerHTML={{ __html: titleRegData }}
            />
            <SubCategory>{"| " + childName}</SubCategory>
          </Top>
          <MainText dangerouslySetInnerHTML={{ __html: mainRegData }} />
        </TextContent>
      </RightCont>
      <CreateTime>{createTime}</CreateTime>
    </Container>
  );
};

export default Board;

const Container = styled.div`
  width: 966px;
  margin: 17px auto 0px;
  display: flex;
  justify-content: space-between;
  gap: 28px;
`;
const RightCont = styled.div`
  display: flex;
  gap: 4px;
`;
const ImgWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid #dedede;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
`;
const Top = styled.div`
  display: flex;
  gap: 3px;
`;
const Title = styled(Link)`
  color: rgb(26, 53, 136);
  text-decoration: underline;
`;
const SubCategory = styled.span`
  color: #999999;
`;
const MainText = styled.div`
  width: 530px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const CreateTime = styled.div`
  color: #666666;
`;
