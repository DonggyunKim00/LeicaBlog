import axios from "axios";
import { getNewToken } from "./login";
import { checkJwt } from "./userInfo";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// 요청을 보내기 전, 수행할 일
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};

    // 요청의 컨텐츠타입에 따라 변경
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    const accessToken = sessionStorage.getItem("access") || "";
    if (accessToken) {
      const res = await checkJwt();
      if (res?.status === 200) config.headers.Authorization = accessToken;
      else if (res === "1007") {
        // accessToken이 만료되었을때, refreshToken으로 jwt토큰 재발급
        const refreshToken = sessionStorage.getItem("refresh");
        const newToken = await getNewToken(refreshToken);
        sessionStorage.setItem("access", newToken.headers.get("Authorization"));
        sessionStorage.setItem("refresh", newToken.headers.get("Refreshtoken"));
        config.headers.Authorization = sessionStorage.getItem("access");
      } else if (res === "1001" || res === "1003" || res === "1004") {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      } else if (res === "1005") {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      } else {
        alert("알 수 없는 오류가 발생하였습니다.");
        window.location.reload();
      }
    }
    return config;
  },
  (error) => {
    // 오류 요청을 보내기전 수행할 코드
    console.log(error);
  }
);

// 요청 보낸 후, 수행할 일
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
