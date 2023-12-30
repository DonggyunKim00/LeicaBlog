import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getUserInfo = async () => {
  try {
    const res: any = await axiosInstance.get(`/info`, {
      headers: {
        Authorization: sessionStorage.getItem("access"),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

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
