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
      isactive={isActive ? "true" : "false"} // Pass isActive as a custom attribute
    >
      {children}
    </Container>
  );
};

export default ToolbarBtn;

const Container = styled.button<{ isactive: string }>`
  height: 30px;
  margin: 0px 5px;
  padding: 0px 5px;
  border-radius: 10px;
  border: 1px solid #99999a;
  background-color: ${(props) =>
    props.isactive === "true" ? "#05af1e" : "transparent"};
  &:hover {
    cursor: pointer;
    border: 1px solid #0000001a;
  }
`;
