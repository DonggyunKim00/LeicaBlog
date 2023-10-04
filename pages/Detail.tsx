import Layout from "@/components/Layout";
import DetailPostPage from "@/container/detailPostPage/DetailPostPage";
import React from "react";
import { AdminProvider } from "@/components/AdminProvider";

const Detail = () => {
  return (
    <Layout>
      <DetailPostPage />
    </Layout>
  );
};

export default Detail;
