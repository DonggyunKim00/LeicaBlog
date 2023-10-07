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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/find/${boardId}`)
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/find/${boardId}`)
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

interface searchChildListType {
  size: number; // totalElement 로 변경예정
  lastPage: boolean;
  totalPage: number;
  childList: [
    {
      id: number;
      title: string;
      content: string;
      subTitle: string | null;
      thumbnail: string;
      parentName: string;
      childName: string;
    }
  ];
}
interface SearchBoardContent {
  keyword?: string;
  size: number;
  page: number;
}
export const useSearchBoardData = ({
  keyword,
  size,
  page,
}: SearchBoardContent) => {
  const [findBoard, setFindBoard] = useState<searchChildListType>({
    size: 0, // totalElement로 바뀔예정
    lastPage: false,
    totalPage: 1,
    childList: [
      {
        id: 0,
        title: "",
        content: "",
        subTitle: null,
        thumbnail: "",
        parentName: "",
        childName: "",
      },
    ],
  });

  useEffect(() => {
    if (keyword) {
      fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/search?keyword=${keyword}&size=${size}&page=${page - 1}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFindBoard(data);
        })

        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [keyword, page, size]);

  return { findBoard };
};
