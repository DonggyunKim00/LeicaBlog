import React, { createContext, useState } from "react";
import { styled } from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

interface FileLoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export const FileLoadingContext = createContext<FileLoadingState>({
  isLoading: false,
  setIsLoading: () => {},
});

export const FileLoadingProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FileLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <AbsoluteDiv>
          <LoadingSpinner width={150} height={150} border={4} />
          <span>파일 업로드중...</span>
          <span>잠시만 기다려주세요</span>
        </AbsoluteDiv>
      )}
      {props.children}
    </FileLoadingContext.Provider>
  );
};

const AbsoluteDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 100%;
  height: 100%;
`;
