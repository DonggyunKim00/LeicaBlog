import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import { generateHTML } from "@tiptap/react";
import { extension } from "@/utils/editorExtension";
import Image from "next/image";
import { useDetailBoard } from "@/hooks/boardHook/useBoard";

export interface Post {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  childName: string;
  parentName: string;
  modified_at: string;
  createdAt: string;
  parentId: number;
  childId: number;
}

const Content = () => {
  const router = useRouter();
  const boardId = Number(router.query.id);

  const { post } = useDetailBoard(boardId);

  const [context, setContext] = useState("");
  useEffect(() => {
    if (post) {
      const html = generateHTML(JSON.parse(post.content), extension);
      setContext(html);
    }
  }, [post]);

  return (
    <Box>
      {post ? (
        <>
          <BoardTitle>
            <Category>{`${post.parentName} - ${post.childName}`}</Category>
            <Title>{post.title}</Title>
            <InfoDiv>
              <RoundImage>
                <Image
                  src="/img/main/ntsSymbol.png"
                  width={30}
                  height={15}
                  alt=""
                />
              </RoundImage>
              <Nick>엔티에스</Nick>
              <PublishDate>{post.createdAt}</PublishDate>
            </InfoDiv>
          </BoardTitle>
          <ThumbnailDiv>
            <ThumbnailImg src={post.thumbnail} alt="" />
          </ThumbnailDiv>
          <HrDiv></HrDiv>
          {post.subTitle && <SubTitle>{post.subTitle}</SubTitle>}
          <HtmlCont dangerouslySetInnerHTML={{ __html: context }} />
        </>
      ) : (
        // id가 없거나 게시물을 아직 불러오지 못한 경우
        <Load>게시물을 불러오는 중...</Load>
      )}
    </Box>
  );
};

export default Content;

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  padding: 0px 40px;
  justify-content: center;
`;
const BoardTitle = styled.div`
  width: 100%;
  padding: 50px 0px 10px;
  border-bottom: 1px solid #dedede;
`;
const PublishDate = styled.span`
  font-size: 14px;
  color: #252525;
  opacity: 0.5;
`;
const RoundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
  width: 35px;
  height: 35px;
  border-radius: 100%;
`;
const ThumbnailDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const ThumbnailImg = styled.img`
  width: 550px;
  height: 550px;
  padding: 50px 0px 20px;
`;
const HrDiv = styled.div`
  border-top: 1px solid #ddd;
  margin: 20px auto;
  border-top: 1px solid #252525;
  margin: 40px auto 0px;
  width: 250px;
  &::after {
    content: "◇";
    font-size: 30px;
    position: relative;
    top: -14px;
    left: calc(50% - 8px);
    background-clip: padding-box;
    background-color: #fbfbff;
  }
`;
const SubTitle = styled.h2`
  display: flex;
  justify-content: center;
  font-weight: normal;
  font-size: 34px;
  line-height: 1.8;
  margin-bottom: 40px;
`;
const Category = styled.span`
  color: rgb(37, 37, 37);
  font-size: 16px;
  opacity: 0.5;
`;
const Title = styled.h1`
  line-height: 48px;
  font-size: 32px;
  padding: 20px 0px 34px;
  font-weight: normal;
  word-wrap: break-word;
`;
const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Nick = styled.span`
  font-size: 14px;
  color: #252525;
`;
const HtmlCont = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 100px;
  span {
    line-height: 1.8;
  }
  p {
    font-weight: normal;
    min-height: 27px;
    margin: 0;
  }
  .custom-HyperLink {
    color: #608cba;
    text-decoration: underline;
    cursor: pointer;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }
  /* image style */
  img {
    display: block;
  }
  #left {
    float: left;
    margin-right: 36px;
    &::before {
      clear: left;
      display: block;
    }
    &::after {
      clear: left;
      display: block;
    }
  }
  #right {
    float: right;
    margin-left: 36px;
    &::before {
      clear: right;
      display: block;
    }
    &::after {
      clear: right;
      display: block;
    }
  }
  /* youtube style */
  iframe {
    border: 2px solid #000;
    border-radius: 4px;
    display: block;
    margin: auto;
    height: 350px;
  }

  /* HorizontalRule style */
  div.hrDiv {
    border-top: 1px solid #ddd;
    margin: 20px auto;
  }
  div.hrDivWhiteSquare {
    border-top: 1px solid #252525;
    margin: 40px auto 0px;
    width: 250px;
    &::after {
      content: "◇";
      font-size: 30px;
      position: relative;
      top: -9px;
      left: calc(50% - 8px);
      background-clip: padding-box;
      background-color: #fbfbff;
    }
  }
  div.hrDivDarkSquare {
    border-top: 1px solid #252525;
    margin: 40px auto 0px;
    width: 250px;
    &::after {
      content: "⬥";
      font-size: 30px;
      position: relative;
      top: -16px;
      left: calc(50% - 8px);
      background-clip: padding-box;
      background-color: #fbfbff;
    }
  }
  div.hrDivShort {
    border-top: 1px solid #ddd;
    margin: 20px auto;
    width: 250px;
  }

  blockquote.openEndQuoteGray {
    ::before {
      content: "";
      display: inline-block;
      margin-right: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -115px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(37, 37, 37);
    }
    ::after {
      content: "";
      display: inline-block;
      margin-left: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -69px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(37, 37, 37);
    }
  }

  blockquote.openEndQuoteDark {
    ::before {
      content: "";
      display: inline-block;
      margin-right: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -90px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(0, 0, 0);
    }
    ::after {
      content: "";
      display: inline-block;
      margin-left: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -48px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(0, 0, 0);
    }
  }

  blockquote.borderSquareQuote {
    position: relative;
    margin-bottom: 50px;
    margin: 50px 300px;
    padding: 20px 30px;
    ::before,
    ::after {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border: solid #4a4a4a;
    }
    ::before {
      top: -30px;
      left: -30px;
      border-width: 6px 0 0 6px;
    }
    ::after {
      bottom: -30px;
      right: -30px;
      border-width: 0 6px 6px 0;
    }
  }

  blockquote.paperBoardQuote {
    max-width: 460px;
    padding: 33px 33px 0;
    border: solid #d5d5d5;
    border-width: 4px 4px 0;
    background: transparent;
    position: relative;
    margin: 50px auto;
    box-sizing: border-box;
    ::before {
      width: 47px;
      height: 48px;
      content: "";
      position: absolute;
      top: 100%;
      right: -4px;
      background-image: url(//editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position: -300px -186px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
    }
    ::after {
      content: "";
      position: absolute;
      top: 100%;
      left: -4px;
      right: 43px;
      height: 48px;
      background-color: transparent;
      border: solid #d5d5d5;
      border-width: 0 0 4px 4px;
      box-sizing: border-box;
    }
  }

  blockquote.balloonQuote {
    padding-top: 35px;
    padding-bottom: 33px;
    border-width: 5px;
    max-width: 460px;
    padding: 21px;
    border: 4px solid #e4e4e4;
    border-bottom: 0;
    box-sizing: border-box;
    background: transparent;
    position: relative;
    margin: auto;
    margin-bottom: 50px;
    ::before {
      content: "";
      position: absolute;
      left: -5px;
      right: -5px;
      bottom: -5px;
      height: 5px;
      background: linear-gradient(
        90deg,
        #e4e4e4 0,
        #e4e4e4 30%,
        transparent 0,
        transparent 180px,
        #e4e4e4 0,
        #e4e4e4
      );
    }
    ::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 30%;
      width: 44px;
      height: 39px;
      background-image: url(//editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position: -182px -325px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
    }
  }
  blockquote.basicDarkQuote {
    position: relative;
    margin: auto;
    box-sizing: border-box;
    padding: 0 20px;
    border-left: 6px solid #515151;
  }
  blockquote.basicGrayQuote {
    position: relative;
    margin: auto;
    box-sizing: border-box;
    padding: 0 20px;
    border-left: 6px solid #b5b2b2;
  }

  ul {
    list-style-type: none;
  }
  ul.bulletList > li > p {
    &::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 13px;
      background-image: url(/img/writingPage/bullet.png);
      background-repeat: no-repeat;
    }
  }
  ul.diamondList > li > p {
    list-style-type: none;
    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 13px;
      background-image: url(/img/writingPage/diamond.png);
      background-repeat: no-repeat;
    }
  }
  ul.checkList > li > p {
    list-style-type: none;
    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 10px;
      background-image: url(/img/writingPage/check.png);
      background-repeat: no-repeat;
    }
  }
  ol {
    margin-left: 18px;
    list-style-position: inherit;
  }
`;
