import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import search from "../../public/img/main/search.png";
import { useSearchSubmit } from "@/hooks/searchHook/useSearchSubmit";
import Link from "next/link";
import { AdminContext } from "./AdminProvider";

const Search = () => {
  const { inputValue, setInputValue, submit } = useSearchSubmit();
  const { isAdmin } = useContext(AdminContext);

  return (
    <SearchDiv>
      <SearchBox onSubmit={(e: any) => submit(e, inputValue)}>
        <SearchInput
          value={inputValue}
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
        <SearchImg type="submit" onSubmit={(e: any) => submit(e, inputValue)}>
          <Image src={search} alt={""} width={25} height={25} />
        </SearchImg>
      </SearchBox>
      {isAdmin && (
        <Link href={`/writing`}>
          <WritingBtn>글 작성하기</WritingBtn>
        </Link>
      )}
    </SearchDiv>
  );
};

export default Search;

const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 966px;
  margin: auto;
  margin-bottom: 10px;
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
  background-color: #fbfbff;
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
const WritingBtn = styled.button`
  border: 3px solid #dedede;
  padding: 8px;
  border-radius: 10px;
  color: #000;
  background-color: white;
  &:hover {
    transition: all ease-out 200ms;
    box-shadow: 0px 0px 0px 4px #dedede;
  }
`;
