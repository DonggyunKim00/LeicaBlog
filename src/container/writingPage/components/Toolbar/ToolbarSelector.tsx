import { useState } from "react";
import { styled } from "styled-components";

interface OptionListSet {
  value: string;
  label?: string;
}

interface ToolbarSelectorProps {
  optionArr: Array<OptionListSet>;
  command: (value: string) => boolean | undefined;
  isActive: (value: string) => boolean | undefined;
}

/**
 * optionArr : option에 들어갈 요소들을 [{value:?? , label:??}] 형식으로 받음, label이 없으면 value값이 option에 보여짐
 * command : tiptap의 command를 받음 ex)editor?.chain().focus().toggleUnderline().run()
 */
const ToolbarSelector = ({
  optionArr,
  command,
  isActive,
}: ToolbarSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
    command(value);
  };

  return (
    <SelectContainer
      value={selectedOption || ""}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        handleChange(e.target.value)
      }
    >
      {optionArr.map((option, idx) => (
        <option
          key={idx}
          value={option.value}
          className={isActive(option.value) ? "is-active" : ""}
        >
          {option.label ? option.label : option.value}
        </option>
      ))}
    </SelectContainer>
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
