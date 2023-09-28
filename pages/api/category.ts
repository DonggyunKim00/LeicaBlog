import axios from "axios";

export async function getChildCategory(categoryName: string) {
  try {
    if (categoryName) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}`
      );
      return res;
    } else return { data: [] };
  } catch (err) {
    return { data: [] };
  }
}
