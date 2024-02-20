import axios from "axios";

export const getMicroContent = async (category: any, page: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${category}?size=16&page=${
      page - 1
    }`
  );
  return res;
};

export const getSubMicroContent = async (
  category: any,
  subCategory: any,
  page: number
) => {
  const res = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/post/${category}/${subCategory}?size=16&page=${page - 1}`
  );
  return res;
};
