import axios from "axios";
import axiosInstance from "./axiosInstance";

export const checkJwt = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/expired`, {
      headers: {
        Authorization: sessionStorage.getItem("access"),
      },
    });
    return res;
  } catch (error: any) {
    return error.response.data.code;
  }
};
