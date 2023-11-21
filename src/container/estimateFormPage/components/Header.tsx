import React from "react";
import styled from "styled-components";
import NtsLogo from "../../../../public/img/main/ntsrow.png";
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
          <Image width={300} height={60} alt={""} src={NtsLogo} />
        </LeicaBox>
      </LeicaBar>
    </div>
  );
};

export default Header;

const LeicaBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px auto;
`;
const LeicaBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
