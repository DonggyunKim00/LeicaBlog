import axios from "axios";
import { InputForm } from "@/container/adminLoginPage/LoginPage";
import secureLocalStorage from "react-secure-storage";

export const adminLoginApi = async (form: InputForm) => {
  try {
    const formData = new FormData();
    formData.append("username", form.id);
    formData.append("password", form.password);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 로그인 성공할시 kimyounggil이라는 string을 Buffer로 암호화하여 세션스토리지에 저장
    if (res.status == 200) {
      alert("관리자 로그인 성공");
      secureLocalStorage.setItem("adminKey", "kimyounggil");
      window.location.replace("/");
    }
    return res;
  } catch (err) {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
    return null;
  }
};
