import axios from "axios";

export const useGetParentCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/parent`
    );
    const filledCategories = [
      ...response.data,
      ...Array.from({ length: Math.max(8 - response.data.length, 0) }, () => ({
        id: -1,
        name: "",
      })),
    ];
    return filledCategories;
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};
