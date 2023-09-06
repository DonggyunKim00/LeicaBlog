import React from "react";
import { styled } from "styled-components";

const Content = () => {
  return (
    <>
      <Box>
        여기다가 뭐 형식 알아서 뿌려주면 될듯..?
        <br />
        사진도 넣고
        <br />
        글자도 넣고
        <br /> \
        음 height는 auto로 줬음
        <br />
        몰루~?
        <br />
        아 그리고 위에 카테고리는 실제 라이카 보면
        <br /> 
        카테고리 종류가 아니라 
        <br />
        그 세부 카테고리 안의 다른 글들이 몇개 있는지 보여주는거고 
        <br />
        목록 열면 해당 세부 카테고리에 어떤 게시물 있는지 보여주는 거거든 
        <br />
        그거 클릭하면 해당 게시물 페이지로 링크되고
        <br />
        그것도 나중에 구현 해줄게
  
      </Box>
    </>
  );
};

export default Content;

const Box = styled.div`
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  padding: 20px 15px 20px 15px;
  justify-content: center;
`;
