import axios from "axios";

export interface IUploadImage {
  image: File;
}

export async function uploadImage({ image }: IUploadImage) {
  const formData = new FormData();

  formData.append("image", image);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data as string;
}
