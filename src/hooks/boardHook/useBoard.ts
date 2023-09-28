import { useEffect, useState } from "react";
import { Post } from "@/container/detailPostPage/components/Content";
import { useRouter } from "next/router";

// 라우팅에 따른 게시물 호출
export const useIsUpdateBoard = (boardId: number) => {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [routeBool, setRouteBool] = useState<boolean>(false);
  useEffect(() => {
    setRouteBool(router.pathname == "/update");
  }, [router]);

  useEffect(() => {
    if (boardId && routeBool) {
      // API 호출
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/find/${boardId}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [boardId, routeBool]);

  return { post };
};

// 게시물 호출 api
export const useDetailBoard = (boardId: number) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (boardId) {
      // API 호출
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/find/${boardId}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [boardId]);

  return { post };
};
