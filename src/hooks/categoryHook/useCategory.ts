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

export const useGetChildCategory = (parentId: number, options?: any) => {
  console.log(parentId);
  const { data, refetch } = useQuery(
    ["childCategory", parentId],
    () => getChildCategory(parentId),
    {
      ...options,
    }
  );
  return { data, refetch };
};
