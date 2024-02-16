import { InputForm } from "@/container/adminLoginPage/LoginPage";
import { useMutation } from "react-query";
import { adminLoginApi } from "../../../pages/api/login";

export const useLogin = (form: InputForm) => {
  const { mutate, isLoading } = useMutation(["loginData"], () =>
    adminLoginApi(form)
  );

  return { mutate, isLoading };
};
