import axios from 'axios';
import axiosInstance from './axiosInstance';

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

export async function getChildCategory(categoryId: number) {
  try {
    if (categoryId) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`
      );
      return res;
    } else return { data: [] };
  } catch (err) {
    return { data: [] };
  }
}

export const postChildCategory = async (
  parentName: string | string[] | undefined,
  childName: string,
  parentId: string | string[] | undefined
) => {
  try {
    const response = await axiosInstance.post(`/category/child`, {
      parentId: parentId,
      childName: childName,
    });
    if (response.status === 200) {
      alert(parentName + '의 세부 카테고리가 성공적으로 생성되었습니다.');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error creating subcategory');
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
      alert('카테고리가 수정되었습니다');
      window.location.reload();
    } else if (response.status === 208) {
      alert(response.data);
    }
  } catch (error) {
    console.error('수정중에 오류가 발생했습니다.');
  }
};

export const deleteChildCategory = async (categoryId: number | null) => {
  try {
    const response = await axiosInstance.delete(
      `/category/child/${categoryId}`
    );

    if (response.status === 200) {
      alert('카테고리가 삭제되었습니다');
      window.location.reload();
    }
  } catch (error) {
    console.error('오류 발생:');
  }
};
