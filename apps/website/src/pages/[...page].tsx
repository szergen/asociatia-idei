import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
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
  // Layout logic is handled in _app.tsx based on page.data.useLayout

  // Full page (Builder.io controls content)
  return <BuilderPage page={page} model={model} />;
};

export const getStaticProps: GetStaticProps =
  generateBuilderStaticProps("page");
export const getStaticPaths: GetStaticPaths =
  generateBuilderStaticPaths("page");

export default DynamicPage;
