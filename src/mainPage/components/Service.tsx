import React from "react";
import styled from "styled-components";
import Image from "next/image";
import copy from "../../../public/img/main/copy.png";

const Service = () => {
  return (
    // <MenuBox>
    //   <MenuIcon>
    //     <Image width={20} height={20} alt={""} src={copy} />
    //   </MenuIcon>
    //   <MenuName>견적 및 서비스 문의</MenuName>
    // </MenuBox>
    <Wrappr>
      <MenuBox> asd</MenuBox>
    </Wrappr>
  );
};

export default Service;

const MenuBox = styled.div`
  position: sticky;
  top: 0px;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  left: 1500px;
  display: inline-block;
  margin-top: 300px;
`;

const Wrappr = styled.div`
  display: flex;
`;
// const MenuBox = styled.div`
//   position: sticky;
//   right: 0;
//   top : 100px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 170px;
//   height: 80px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #eeeeee;
//   }
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 5px;
//     background-color: rgb(127, 145, 157);
//   }
// `;
// const MenuIcon = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 15px;
//   margin-bottom: 5px;
// `;
// const MenuName = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 15x;
//   font-weight: 550;
//   white-space: nowrap;
//   color: #686868;
// `;
