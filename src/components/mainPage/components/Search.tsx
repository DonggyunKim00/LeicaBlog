import React from "react";
import styled from "styled-components";
import Image from "next/image";
import search from "../../../../public/img/main/search.png";
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
  );
};

export default Search;

const SearchDiv = styled.div`
  width: 966px;
  height: 43px;
  margin: auto;
  padding: 0px 0px 10px;
`;
const SearchBox = styled.div`
  width: 171px;
  height: 32px;
  border: 1px solid rgb(229, 229, 229);
  display: flex;
  
`;

const SearchInput = styled.input`
  width: 120px;
  height: 14px;
  padding: 8px 0px 8px 10px;
  border: none;
  display: flex;
`;
const SearchImg = styled.div`
  width: 41px;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
