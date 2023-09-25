import { useQuery } from "react-query";
import { getChildCategory } from "../../../pages/api/category";

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
