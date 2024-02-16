import axios from "axios";

export const getMainContents = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post`);
  return res;
};

interface Item {
  id: number;
  thumbnail: string | null;
  title: string;
  content: string;
  createdAt: number;
}
