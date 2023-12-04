import React, { useEffect, useState } from "react";
import { css, styled } from "styled-components";
import { adminLoginApi } from "../../../pages/api/login";

export interface InputForm {
  id: string;
  password: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<InputForm>({ id: "", password: "" });

  return (
    <Container>
      <Title>관리자 로그인</Title>
      <InputDiv
        onSubmit={async (e: any) => {
          await e.preventDefault();
          await adminLoginApi(form);
        }}
      >
        <Id
          placeholder="id를 입력해주세요"
          value={form.id}
          onChange={(e: any) => setForm({ ...form, id: e.target.value })}
        />
        <Password
          placeholder="password를 입력해주세요"
          type="password"
          value={form.password}
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />
        <LoginBtn
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            adminLoginApi(form);
          }}
        >
          로그인
        </LoginBtn>
      </InputDiv>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 100px;
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 700;
`;
const InputDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border: 3px solid #dedede;
`;
const inputcss = css`
  border: 1px solid black;
  width: 200px;
  height: 35px;
`;
const Id = styled.input`
  ${inputcss}
`;
const Password = styled.input`
  ${inputcss}
`;
const LoginBtn = styled.button`
  background-color: bisque;
  width: 50px;
  height: 35px;
`;
