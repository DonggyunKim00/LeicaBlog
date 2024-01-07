import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function getParentCategory() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/parent`
    );
    return res;
  } catch (err) {
    return { data: [] };
  }
}

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

export const postChildCategory = async (
  parentName: string | string[] | undefined,
  childName: string
) => {
  try {
    const response = await axiosInstance.post(`/category/child`, {
      parentName: parentName,
      childName: childName,
    });
    if (response.status === 200) {
      alert(parentName + "의 세부 카테고리가 성공적으로 생성되었습니다.");
      window.location.reload();
    }
  } catch (error) {
    console.error("Error creating subcategory");
  }
};

export const putChildCategory = async (
  categoryId: number | null,
  modifyValue: string
) => {
  try {
    const response = await axiosInstance.put(`/category/${categoryId}`, {
      categoryName: modifyValue,
    });
    if (response.status === 200) {
      alert("카테고리가 수정되었습니다");
      window.location.reload();
    }
  } catch (error) {
    console.error("수정중에 오류가 발생했습니다.");
  }
};

export const deleteChildCategory = async (categoryId: number | null) => {
  try {
    const response = await axiosInstance.delete(
      `/category/child/${categoryId}`
    );

    if (response.status === 200) {
      alert("카테고리가 삭제되었습니다");
      window.location.reload();
    }
  } catch (error) {
    console.error("오류 발생:");
  }
};
