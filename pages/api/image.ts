import axiosInstance from "./axiosInstance";

export interface IUploadImage {
  image: File;
}

export async function uploadImage({ image }: IUploadImage) {
  try {
    const formData = new FormData();

    formData.append("file", image);

    const res = await axiosInstance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data as string;
  } catch (err: any) {
    // 로그인 안되어있을때 401 에러
    if (err.response.status == 401) {
      alert("로그인 해야 이용할 수 있습니다.");
      return;
    }
  }
}
