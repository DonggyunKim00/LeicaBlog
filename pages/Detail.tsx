import Layout from "@/components/Layout";
import DetailPostPage from "@/container/detailPostPage/DetailPostPage";
import React from "react";
import { AdminProvider } from "@/components/AdminProvider";

const Detail = () => {
  return (
    <Layout>
      <AdminProvider>
        <DetailPostPage />
      </AdminProvider>
    </Layout>
  );
};

export default Detail;
