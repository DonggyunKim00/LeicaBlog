import React from "react";
import EstimateForm from "./components/EstimateForm";
import styled from "styled-components";
import Caption from "./components/Caption";
import Header from "./components/Header";

const EstimateFormPage = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <Caption />
        <EstimateForm />
      </Wrapper>
    </div>
  );
};

export default EstimateFormPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
