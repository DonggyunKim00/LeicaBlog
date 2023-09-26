import axios from "axios";

export interface boardPostType {
  searchContent: string;
  title: string;
  content: any;
  thumbnail: string;
  mainCategory: string;
  subCategory: string;
  subTitle: string;
}

export async function postBoard({
  searchContent,
  title,
  content,
  thumbnail,
  mainCategory,
  subCategory,
  subTitle,
}: boardPostType) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/post`,
    {
      searchContent: searchContent,
      post: {
        title: title,
        thumbnail: thumbnail,
        subTitle: subTitle,
        content: content,
        parentName: mainCategory,
        childName: subCategory,
      },
    },
    {
      withCredentials: true,
    }
  );

  return res;
}
