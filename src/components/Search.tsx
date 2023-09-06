import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import search from "../../public/img/main/search.png";
import Router from "next/router";
import { pathName } from "@/config/pathName";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const submit = (e: any, inputValue: string) => {
    e.preventDefault();
    if (!inputValue) {
      alert("검색할 내용을 넣어주세요.");
      return;
    }
    Router.push({
      pathname: pathName.SEARCH,
      query: { keyword: inputValue },
    });
  };
  return (
    <SearchDiv>
      <SearchBox onSubmit={(e: any) => submit(e, inputValue)}>
        <SearchInput
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
        <SearchImg type="submit" onSubmit={(e: any) => submit(e, inputValue)}>
          <Image src={search} alt={""} width={25} height={25} />
        </SearchImg>
      </SearchBox>
    </SearchDiv>
  );
};

export default Search;

const SearchDiv = styled.div`
  width: 966px;
  height: 43px;
  margin: auto;
  padding: 0px 0px 10px;
`;
const SearchBox = styled.form`
  width: 171px;
  height: 32px;
  border: 1px solid rgb(199, 199, 199);
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 130px;
  height: 30px;
  padding: 8px 0px 8px 10px;
  border: none;
  display: flex;
  outline: none;
`;
const SearchImg = styled.button`
  width: 41px;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;
