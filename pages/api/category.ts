import axiosInstance from "./axiosInstance";

export async function getParentCategory() {
  try {
    const res = await axiosInstance.get(`/category/parent`);
    return res;
  } catch (err) {
    return { data: [] };
  }
}

export async function getChildCategory(categoryName: string) {
  try {
    if (categoryName) {
      const res = await axiosInstance.get(`/category/${categoryName}`);
      return res;
    } else return { data: [] };
  } catch (err) {
    return { data: [] };
  }
}
