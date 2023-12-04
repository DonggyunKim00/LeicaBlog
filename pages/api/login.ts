import { InputForm } from "@/container/adminLoginPage/LoginPage";
import axiosInstance from "./axiosInstance";

export const adminLoginApi = async (form: InputForm) => {
  try {
    const res: any = await axiosInstance.post(`/login`, {
      memberId: form.id,
      password: form.password,
    });
    // 로그인 성공시 jwt 토큰을 세션스토리지에 저장
    if (res.status == 200) {
      alert("관리자 로그인 성공");
      const accessToken = res.headers.get("Authorization");
      const refreshToken = res.headers.get("Refreshtoken");
      sessionStorage.setItem("access", accessToken);
      sessionStorage.setItem("refresh", refreshToken);
      window.location.replace("/");
    }
    return res;
  } catch (err) {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
    return null;
  }
};
