import { useState, useRef } from "react";
import { styled } from "styled-components";

interface OptionListSet {
  value: string;
  label?: string;
}

interface ToolbarSelectorProps {
  optionArr: Array<OptionListSet>;
  command: (value: string) => boolean | undefined | void;
}

/**
 * 컴포넌트 설명
 *    command에 인자로 value가 들어가야 하는것들 ex) text-color, font-size, font-family
 * props 설명
 *    optionArr : option에 들어갈 요소들을 [{value:?? , label:??}] 형식으로 받음, label이 없으면 value값이 option에 보여짐
 *    command : tiptap의 command를 받음 ex) editor?.chain().focus().toggleUnderline().run()
 */
const ToolbarSelector = ({ optionArr, command }: ToolbarSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleApply = () => {
    command(selectedOption);
  };

  return (
    <>
      <SelectContainer
        value={selectedOption || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleChange(e.target.value);
        }}
      >
        {optionArr.map((option, idx) => (
          <option key={idx} value={option.value} onClick={() => {}}>
            {option.label ? option.label : option.value}
          </option>
        ))}
      </SelectContainer>
      <ClickBtn type="button" onClick={handleApply}>
        적용
      </ClickBtn>
    </>
  );
};

export default ToolbarSelector;

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
