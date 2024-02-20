import axios from "axios";

export const getSubCategory = async (category: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${category}`
    );
    const categoryData = response.data;
    return categoryData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
