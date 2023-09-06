import styled from "styled-components";

export interface ToolBarBtnProps extends React.PropsWithChildren {
  onClick: () => void;
  isActive?: boolean;
}

const ToolbarBtn = ({ onClick, isActive, children }: ToolBarBtnProps) => {
  return (
    <Container
      type="button"
      onClick={onClick}
      active={isActive ? "true" : "false"} // Pass isActive as a custom attribute
    >
      {children}
    </Container>
  );
};

export default ToolbarBtn;

const Container = styled.button<{ active: string }>`
  height: 30px;
  margin: 0px 5px;
  padding: 0px 5px;
  border-radius: 10px;
  border: 1px solid #99999a;
  background-color: ${(props) =>
    props.active === "true" ? "#05af1e" : "white"};
  &:hover {
    cursor: pointer;
    border: 1px solid #0000001a;
  }
`;
