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
  try {
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
  } catch (err: any) {
    // 로그인 안되어있을때 401 에러
    if (err.response.status == 401) {
      alert("로그인 해야 이용할 수 있습니다.");
      return;
    }
  }
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
  try {
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
  } catch (err: any) {
    // 로그인 안되어있을때 401 에러
    if (err.response.status == 401) {
      alert("로그인 해야 이용할 수 있습니다.");
      return;
    }
  }
}

// 게시물 삭제
export async function deleteBoard(boardId: number) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${boardId}`
    );
    return res;
  } catch (err: any) {
    // 로그인 안되어있을때 401 에러
    if (err.response.status == 401) {
      alert("로그인 해야 이용할 수 있습니다.");
      return;
    }
  }
}
