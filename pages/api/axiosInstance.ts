import axios from "axios";
import { getNewToken } from "./login";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  // timeout: 1000,
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
      config.headers.Authorization = accessToken;
    } else {
      // accessToken이 없으면 아무것도 하지 않음
    }
    return config;
  },
  (error) => {
    // 오류 요청을 보내기전 수행할 코드
    return Promise.reject(error);
  }
);

// 요청 보낸 후, 수행할 일
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const exception = error.response?.data.status;
    console.log(exception);

    if (exception === 500) {
      // accessToken이 만료되었을때, refreshToken으로 jwt토큰 재발급
      const refreshToken = sessionStorage.getItem("refresh");
      const newAt = await getNewToken(refreshToken);
      sessionStorage.setItem("access", newAt.headers.get("Authorization"));
      sessionStorage.setItem("refresh", newAt.headers.get("Refreshtoken"));

      // 새로 발급받은 accessToken 으로 재요청
      const accessToken = sessionStorage.getItem("access");
      if (error.config.data instanceof FormData) {
        error.config.headers = {
          "Content-Type": "multipart/form-data", // 이 설정이 있어야 바디로 넘어가는 데이터가 form-data로 제대로 넘어감
          Authorization: `${accessToken}`,
        };
      } else {
        error.config.headers = {
          "Content-Type": "application/json", // 이 설정이 있어야 바디로 넘어가는 데이터가 json으로 제대로 넘어감
          Authorization: `${accessToken}`,
        };
      }

      const response = await axios.request(error.config);
      return response;
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
