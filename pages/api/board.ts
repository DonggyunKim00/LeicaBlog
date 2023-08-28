import axios from "axios";

export interface boardPostType {
  title: string;
  categoryName: string;
  content: any;
}

export async function postBoard({
  title,
  categoryName,
  content,
}: boardPostType) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/post`,
    {
      title: title,
      categoryName: categoryName,
      content: content,
    }
  );

  return res;
}
