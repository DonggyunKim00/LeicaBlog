import { InputForm } from "@/container/adminLoginPage/LoginPage";
import axios from "axios";

export const adminLoginApi = async (form: InputForm) => {
  try {
    const res: any = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        memberId: form.id,
        password: form.password,
      }
    );
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

export async function getNewToken(refreshToken: string | null) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reissue`, {
      headers: {
        Refreshtoken: `${refreshToken}`,
      },
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
}
