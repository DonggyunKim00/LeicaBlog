import React from "react";
import styled from "styled-components";

export const ToolBarDivider: React.FC = () => {
  return <Divider />;
};

const Divider = styled.div`
  height: 20px;
  margin: 0px 15px;
  border-left: 1px solid #0000001a;
`;
