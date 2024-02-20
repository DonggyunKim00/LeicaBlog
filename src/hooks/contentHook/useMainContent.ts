import { useEffect, useState } from "react";
import { getMainContents } from "../../../pages/api/mainContents";

const useMainContents = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getContents = async () => {
      const res = await getMainContents();
      setContents(res.data);
    };
    getContents();
  }, []);

  return contents;
};

export default useMainContents;
