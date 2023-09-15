import axios from "axios";

export interface IUploadImage {
  image: File;
}

export async function uploadImage({ image }: IUploadImage) {
  const formData = new FormData();

  formData.append("file", image);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return res.data as string;
}
