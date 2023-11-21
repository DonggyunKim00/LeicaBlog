import { useQuery } from "react-query";
import {
  getChildCategory,
  getParentCategory,
} from "../../../pages/api/category";

export const useGetParentCategory = (options?: any) => {
  const { data, refetch } = useQuery(
    "parentCategory",
    () => getParentCategory(),
    {
      ...options,
    }
  );
  return { data, refetch };
};

export const useGetCategory = (categoryName: string, options?: any) => {
  const { data, refetch } = useQuery(
    "childCategory",
    () => getChildCategory(categoryName),
    {
      ...options,
    }
  );
  return { data, refetch };
};
