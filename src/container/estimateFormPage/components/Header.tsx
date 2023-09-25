import React from "react";
import styled from "styled-components";
import leicaTypo from "../../../../public/img/main/header.png";
import Image from "next/image";
import Router from "next/router";
import { pathName } from "@/config/pathName";

const Header = () => {
  return (
    <div>
      <LeicaBar>
        <LeicaBox
          onClick={() => {
            Router.push(pathName.MAIN);
          }}
        >
          <Image width={160} height={100} alt={""} src={leicaTypo} />
        </LeicaBox>
      </LeicaBar>
    </div>
  );
};

export default Header;

const LeicaBar = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgb(245, 245, 244);
  margin-bottom: 100px;
  position: sticky;
  padding-left: 100px;
`;
const LeicaBox = styled.div`
  width: 160px;
  &:hover {
    cursor: pointer;
  }
`;
