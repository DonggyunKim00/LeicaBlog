import React from "react";
import { styled } from "styled-components";
<<<<<<< HEAD

const SearchPage = () => {
  return <Container>hello</Container>;
=======
import Content from "./components/Content";
import SearchDiv from "./components/SearchDiv";

const SearchPage = () => {
  return (
    <Container>
      <SearchDiv />
      <Content />
    </Container>
  );
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
};

export default SearchPage;

const Container = styled.div`
<<<<<<< HEAD
  margin: 0px auto;
=======
  width: 966px;
  margin: 17px auto 0px;
  display: flex;
  flex-direction: column;
  gap: 28px;
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
`;
