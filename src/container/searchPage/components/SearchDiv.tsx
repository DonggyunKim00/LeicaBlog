import React from "react";
import { styled } from "styled-components";
import { useSearchSubmit } from "@/hooks/searchHook/useSearchSubmit";

const SearchDiv = () => {
  const { inputValue, setInputValue, submit } = useSearchSubmit();
  return (
    <Container>
      <FormDiv onSubmit={(e: any) => submit(e, inputValue)}>
        <SearchInput
          value={inputValue}
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
        <SearchBtn type="submit" onSubmit={(e: any) => submit(e, inputValue)} />
      </FormDiv>
    </Container>
  );
};

export default SearchDiv;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  border: 4px solid #f2f2f2;
`;
const FormDiv = styled.form`
  display: flex;
  gap: 2px;
`;
const SearchInput = styled.input`
  width: 280px;
  height: 22px;
  padding: 3px 4px;
  border: 1px solid #a0a7ad;
  border-radius: 5px;
  background: #f8f8f8;
`;
const SearchBtn = styled.button`
  background-image: url(https://blogimgs.pstatic.net/nblog/btn_blogsearch.gif);
  width: 43px;
  height: 21px;
`;
