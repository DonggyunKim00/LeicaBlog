import React from "react";
import { styled } from "styled-components";
import Content from "./components/Content";
import SearchDiv from "./components/SearchDiv";

const SearchPage = () => {
  return (
    <Container>
      <SearchDiv />
      <Content />
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 966px;
  margin: 17px auto 0px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
