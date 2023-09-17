import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/router";


interface Post {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  writer: string;
  category: string;
}


const Content = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      // API 호출
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/find/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("게시물을 가져오는 중 오류 발생:", error);
        });
    }
  }, [id]);
  return (
    <Box>
      {post ? (
          <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h1>{post.subTitle}</h1>
            <p>{post.writer}</p>
            <p>{post.category}</p>
            <p></p>

          </>
        ) : (
          // id가 없거나 게시물을 아직 불러오지 못한 경우
          <p>게시물을 불러오는 중...</p>
        )}
    </Box>
  );
};

export default Content;

const Box = styled.div`
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  padding: 20px 15px 20px 15px;
  justify-content: center;
`;
