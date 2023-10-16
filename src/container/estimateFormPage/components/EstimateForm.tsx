import { AnyARecord } from "dns";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import { pathName } from "@/config/pathName";

const EstimateForm = () => {
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    region: "",
    country: "",
    request: "",
    agreePrivacyPolicy: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (userData.agreePrivacyPolicy !== "yes") {
      alert("개인정보 수집 및 활용에 동의해야 메일을 전송할 수 있습니다.");
      return;
    }
    const emailData = {
      mailTo: "sdzx0719@naver.com",
      content: `
  견적 요청
  
  이름: ${userData.name}
  성: ${userData.surname}
  이메일: ${userData.email}
  휴대폰번호: ${userData.phone}
  회사/기관: ${userData.company}
  직책: ${userData.position}
  지역: ${userData.region}
  국가 혹은 지역: ${userData.country}
  
  기타 요청사항이나 문의 사항:
  ${userData.request}
  
  개인정보 수집 및 활용에 대한 동의:
  - 관련 제품, 서비스, 워크샵 등에 대한 정보를 전화/이메일/문자메시지를 통해 제공
  - 서비스 개선/개발을 위한 만족도조사 및 통계처리
  
  동의 여부: ${
    userData.agreePrivacyPolicy === "yes"
      ? "예 (동의함)"
      : "아니오 (동의하지 않음)"
  }
      `,
      subject: "Test Sending Mail",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("이메일이 성공적으로 전송되었습니다");
        setUserData({
          name: "",
          surname: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          region: "",
          country: "",
          request: "",
          agreePrivacyPolicy: "",
        });
        Router.push(pathName.MAIN);
      } else {
        console.error("이메일 전송 실패:", response);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <EstimateBox>
        <ContactWrapper>
          <ContactBox>CONTACT US</ContactBox>
        </ContactWrapper>
        <Line>
          <Wrapper>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="surname">성 *</Label>
            <Input
              id="surname"
              name="surname"
              value={userData.surname}
              onChange={handleInputChange}
              required={true}
            />
          </Wrapper>
        </Line>
        <Line>
          <Wrapper>
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="phone">휴대폰번호 *</Label>
            <Input
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
        </Line>
        <Line>
          <Wrapper>
            <Label htmlFor="company">회사/기관 *</Label>
            <Input
              id="company"
              name="company"
              value={userData.company}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="position">직책 *</Label>
            <Input
              id="position"
              name="position"
              value={userData.position}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
        </Line>
        <Line>
          <Wrapper>
            <Label htmlFor="region">지역 *</Label>
            <Input
              id="region"
              name="region"
              value={userData.region}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="country">국가 *</Label>
            <Input
              id="country"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              required
            />
          </Wrapper>
        </Line>

        <Label htmlFor="request">
          기타 요청사항이나 문의 사항이 있으면 기재해주세요.
        </Label>
        <RequestBox>
          <RequestInput
            id="request"
            name="request"
            value={userData.request}
            onChange={handleInputChange}
          />
        </RequestBox>
        <PrivacyLabel>
          상기의 개인정보(이메일,연락처)를 엔티에스에서 아래와 같은 목적으로
          수집/활용하는 것에
          <br /> 동의합니다. <br />
          - 관련 제품, 서비스, 워크샵 등에 대한 정보를 전화/이메일/문자메시지를
          통해 제공
          <br />- 서비스 개선/개발을 위한 만족도조사 및 통계처리 *
        </PrivacyLabel>
        <RadioButtonGroup>
          <RadioBox>
            <RadioButton
              type="radio"
              id="agreeYes"
              name="agreePrivacyPolicy"
              value="yes"
              checked={userData.agreePrivacyPolicy === "yes"}
              onChange={handleInputChange}
              required
            />
            <RadioLabel htmlFor="agreeYes">예</RadioLabel>
          </RadioBox>

          <RadioBox>
            <RadioButton
              type="radio"
              id="agreeNo"
              name="agreePrivacyPolicy"
              value="no"
              checked={userData.agreePrivacyPolicy === "no"}
              onChange={handleInputChange}
            />
            <RadioLabel htmlFor="agreeNo">아니오</RadioLabel>
          </RadioBox>
        </RadioButtonGroup>
        <AgreeDiv>
          아래의 (지금 전송) 버튼 클릭함으로써 엔티에스의 <br />
          <RedText>이용약관과 개인정보 취급방침</RedText>을 검토하고
          동의하였음을 확인합니다. <br />
          또한 본인의 개인정보에 대한 선택을 엔티에스의
          <br />
          <RedText>개인정보 취급방침</RedText>에 따라 처리하는것에 동의합니다.
        </AgreeDiv>
        <SubmitButton type="submit">지금 전송</SubmitButton>
      </EstimateBox>
    </form>
  );
};

export default EstimateForm;

const EstimateBox = styled.div`
  width: 658.6px;
  height: auto;
  background-color: #f5f5f4;
  padding: 0px 32px 32px 32px;
  border-radius: 5px;
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const ContactBox = styled.div`
  margin: auto;
  background-color: #dfdfdd;
  width: 137.29px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 270.2px;
  height: 71.6px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  width: 260.6px;
  height: 40px;
  padding-left: 8px;
  font-size: 16px;
  border-color: rgb(214, 211, 209);
  border: 1px solid rgb(214, 211, 209);
  border-radius: 4px;
  margin-top: 10px;
`;

const RequestInput = styled.textarea`
  width: 584.2px;
  min-height: 64px;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid rgb(214, 211, 209);
  border-radius: 4px;
  margin-top: 10px;
  resize: vertical;
  overflow: hidden;
  margin-bottom: 30px;
`;

const RequestBox = styled.div``;

const PrivacyLabel = styled.label`
  font-size: 16px;
  line-height: 1.5;
`;

const RadioButtonGroup = styled.div`
  display: flexbox;
  align-items: center;
  margin-top: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
  accent-color: red;
  width: 17px;
  height: 17px;
`;

const RadioLabel = styled.label`
  font-size: 17px;
`;

const RadioBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const AgreeDiv = styled.div`
  margin-top: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const RedText = styled.span`
  color: red;
`;

const SubmitButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 50px;
`;
