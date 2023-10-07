import { AdminProvider } from "@/components/AdminProvider";
import Layout from "@/components/Layout";
import MicroScopePage from "@/container/microScopePage/microScopePage";
import type { NextPage } from "next";

const MicroScope: NextPage = () => {
  return (
    <Layout>
      <AdminProvider>
        <MicroScopePage />
      </AdminProvider>
    </Layout>
  );
};

export default MicroScope;
