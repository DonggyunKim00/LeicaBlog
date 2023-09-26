import { pathName } from "@/config/pathName";
import Router from "next/router";
import { useState } from "react";
export const useSearchSubmit = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const submit = (e: any, inputValue: string) => {
    e.preventDefault();
    if (!inputValue) {
      alert("검색할 내용을 넣어주세요.");
      return;
    }
    Router.push({
      pathname: pathName.SEARCH,
      query: { keyword: inputValue },
    });
    setInputValue("");
  };

  return { inputValue, setInputValue, submit };
};
