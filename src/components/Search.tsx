import React from "react";
import styled from "styled-components";
import Image from "next/image";
import search from "../../public/img/main/search.png";
<<<<<<< HEAD
const Search = () => {
  return (
    <div>
      <SearchDiv>
        <SearchBox>
          <SearchInput />
          <SearchImg>
            <Image src={search} alt={""} width={25} height={25} />
          </SearchImg>
        </SearchBox>
      </SearchDiv>
    </div>
=======
import { useSearchSubmit } from "@/hooks/searchHook/useSearchSubmit";

const Search = () => {
  const { inputValue, setInputValue, submit } = useSearchSubmit();

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
    </SearchDiv>
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
  );
};

export default Search;

const SearchDiv = styled.div`
  width: 966px;
  height: 43px;
  margin: auto;
  padding: 0px 0px 10px;
`;
<<<<<<< HEAD
const SearchBox = styled.div`
=======
const SearchBox = styled.form`
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
  width: 171px;
  height: 32px;
  border: 1px solid rgb(199, 199, 199);
  display: flex;
<<<<<<< HEAD
`;

const SearchInput = styled.input`
  width: 120px;
=======
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 130px;
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
  height: 30px;
  padding: 8px 0px 8px 10px;
  border: none;
  display: flex;
<<<<<<< HEAD
  outline: none;
`;
const SearchImg = styled.div`
=======
`;
const SearchImg = styled.button`
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
  width: 41px;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
=======
  &:hover {
    cursor: pointer;
  }
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
`;
