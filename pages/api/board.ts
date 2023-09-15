import axios from "axios";

export interface boardPostType {
  title: string;
  content: any;
  thumbnail: string;
  mainCategory: string;
  subCategory: string;
}

export async function postBoard({
  title,
  content,
  thumbnail,
  mainCategory,
  subCategory,
}: boardPostType) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    title: title,
    content: content,
    thumbnail: thumbnail,
    subTitle: "hihi",
    parentName: mainCategory,
    childName: subCategory,
  });

  return res;
}
