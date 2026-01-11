import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { builderConfig } from "../builder.config";

interface BuilderPageProps {
  page?: any;
  model: string;
}

// Full page Builder.io component
const BuilderPage: React.FC<BuilderPageProps> = ({ page, model }) => {
  const isPreviewing = useIsPreviewing();

  // Show a loading state when we're generating page
  if (!page && !isPreviewing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 mt-2">This page could not be found.</p>
        </div>
      </div>
    );
  }

  const title = page?.data?.title || "Asociația IDEI";
  const description =
    page?.data?.description || "Asociația IDEI - Promovăm dezvoltarea durabilă";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {page?.data?.image && (
          <>
            <meta property="og:image" content={page.data.image} />
            <meta name="twitter:image" content={page.data.image} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <BuilderComponent
        model={model}
        content={page}
        options={{
          includeRefs: true,
        }}
        data={{
          // Pass any additional data to Builder.io components
          locale: "ro",
          timestamp: Date.now(),
        }}
      />
    </>
  );
};

export default BuilderPage;

// Helper function to get Builder.io page data
export const getBuilderPageData = async (
  model: string,
  urlPath: string,
  options: any = {}
) => {
  try {
    const page = await builder
      .get(model, {
        userAttributes: {
          urlPath,
        },
        options: {
          includeRefs: true,
          ...options,
        },
      })
      .toPromise();

    return page;
  } catch (error) {
    console.error(`Error fetching Builder.io ${model} content:`, error);
    return null;
  }
};

// Static generation helpers for Next.js
export const generateBuilderStaticProps = (model: string): GetStaticProps => {
  return async ({ params, preview }) => {
    const urlPath = `/${(params?.page as string[])?.join("/") || ""}`;

    const page = await getBuilderPageData(model, urlPath, {
      includeUnpublished: preview,
    });

    return {
      props: {
        page: page || null,
        model,
      },
      revalidate: 60, // Revalidate every minute
    };
  };
};

export const generateBuilderStaticPaths = (model: string): GetStaticPaths => {
  return async () => {
    // Get all published pages from Builder.io
    const pages = await builder.getAll(model, {
      options: { noTargeting: true },
      limit: 100,
    });

    // Generate paths for all pages
    const paths = pages
      .map((page) => ({
        params: {
          page: page.data?.url?.split("/").filter(Boolean) || [],
        },
      }))
      .filter((path) => path.params.page.length > 0);

    return {
      paths,
      fallback: "blocking",
    };
  };
};
