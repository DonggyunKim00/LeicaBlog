import axios from "axios";

interface CategoryType {
  categoryName: string;
}

export async function getChildCategory(categoryName: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}`
    );
    return res;
  } catch (err) {
    alert(`${categoryName}에 대한 데이터가 없습니다.`);
    console.log(err);
    return null;
  }
}
