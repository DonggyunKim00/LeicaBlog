import axios from "axios";

// 게시물 post
export interface boardPostType {
  searchContent: string;
  title: string;
  content: any;
  thumbnail: string;
  mainCategory: string;
  subCategory: string;
  subTitle?: string;
}
export async function postBoard({
  searchContent,
  title,
  content,
  thumbnail,
  mainCategory,
  subCategory,
  subTitle,
}: boardPostType) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/post`,
    {
      searchContent: searchContent,
      post: {
        title: title,
        thumbnail: thumbnail,
        subTitle: subTitle,
        content: content,
        parentName: mainCategory,
        childName: subCategory,
      },
    },
    {
      withCredentials: true,
    }
  );

  return res;
}

// 게시물 수정
interface boardPutType extends boardPostType {
  boardId: number;
}
export async function putBoard({
  searchContent,
  title,
  content,
  thumbnail,
  mainCategory,
  subCategory,
  subTitle,
  boardId,
}: boardPutType) {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${boardId}`,
    {
      searchContent: searchContent,
      post: {
        title: title,
        thumbnail: thumbnail,
        subTitle: subTitle,
        content: content,
        parentName: mainCategory,
        childName: subCategory,
      },
    },
    {
      withCredentials: true,
    }
  );

  return res;
}

// 게시물 삭제
export async function deleteBoard(boardId: number) {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${boardId}`
  );

  return res;
}
