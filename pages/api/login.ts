import axios from "axios";
import { InputForm } from "@/container/adminLoginPage/LoginPage";
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

    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
