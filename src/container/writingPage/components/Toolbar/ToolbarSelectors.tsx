import React, { useState } from "react";
import styled from "styled-components";

interface OptionListSet {
  command: any;
  label: string;
}

interface ToolbarSelectorProps {
  optionArr: Array<OptionListSet>;
}
/**
 * 컴포넌트 설명
 *    command의 함수 이름자체가 다른데(class로 스타일을 적용하는) 종류가 비슷한것들=> horizontalRule, blockquote
 * props 설명
 *    optionArr : option에 들어갈 요소들을 [{command:?? , label:??}, {...} ] 형식으로 받음, label은 사용자에게 보여지는 옵션, command는 사용되는 함수
 *                                            => command : tiptap의 command를 받음 ex) editor?.chain().focus().toggleUnderline().run()
 */
const ToolbarSelectors = ({ optionArr }: ToolbarSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const handleChange = (value: number) => {
    setSelectedOption(value);
  };
  const handleApply = () => {
    optionArr[selectedOption].command();
  };

  return (
    <>
      <SelectContainer
        value={selectedOption || 0}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(Number(e.target.value))
        }
      >
        {optionArr.map((option, idx) => (
          <option key={idx} value={idx}>
            {option.label}
          </option>
        ))}
      </SelectContainer>
      <ClickBtn type="button" onClick={handleApply}>
        적용
      </ClickBtn>
    </>
  );
};

export default ToolbarSelectors;

const SelectContainer = styled.select`
  height: 30px;
  padding: 2px;
  font-size: 15px;
  margin: 0px 5px;
  border-radius: 10px;
  border: 1px solid #99999a;
  outline: none;
`;
const ClickBtn = styled.button`
  border-radius: 10px;
  border: 1px solid #99999a;
  padding: 5px;
  background-color: white;
`;
