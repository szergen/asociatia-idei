import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../components/Layout";
import {
  BuilderPage,
  generateBuilderStaticProps,
  generateBuilderStaticPaths,
} from "../builder";

interface DynamicPageProps {
  page?: any;
  model: string;
}

// Dynamic page component for full Builder.io pages
const DynamicPage: React.FC<DynamicPageProps> = ({ page, model }) => {
  // Check if this page should use a layout
  const useLayout = page?.data?.useLayout !== false;

  if (useLayout) {
    return (
      <Layout>
        <BuilderPage page={page} model={model} />
      </Layout>
    );
  }

  // Full page without layout (Builder.io controls everything)
  return <BuilderPage page={page} model={model} />;
};

export const getStaticProps: GetStaticProps =
  generateBuilderStaticProps("page");
export const getStaticPaths: GetStaticPaths =
  generateBuilderStaticPaths("page");

export default DynamicPage;
