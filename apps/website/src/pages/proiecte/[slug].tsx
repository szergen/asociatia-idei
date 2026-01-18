import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { BuilderPage, builder } from "../../builder";

interface ProjectPageProps {
  page?: any;
  model: string;
}

// Individual project page component
const ProjectPage: React.FC<ProjectPageProps> = ({ page, model }) => {
  // Layout logic is handled in _app.tsx

  return <BuilderPage page={page} model={model} />;
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const slug = params?.slug as string;
  const urlPath = `/proiecte/${slug}`;

  try {
    const page = await builder
      .get("project-page", {
        userAttributes: {
          urlPath,
        },
        options: {
          includeRefs: true,
          includeUnpublished: preview,
        },
      })
      .toPromise();

    return {
      props: {
        page: page || null,
        model: "project-page",
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error("Error fetching project page:", error);
    return {
      props: {
        page: null,
        model: "project-page",
      },
      revalidate: 60,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get all published project pages from Builder.io
    const pages = await builder.getAll("project-page", {
      options: { noTargeting: true },
      limit: 100,
      fields: "data.url,data.slug",
    });

    // Generate paths for all project pages
    const paths = pages
      .map((page) => {
        // Try to get slug from data.slug or extract from data.url
        const slug =
          page.data?.slug ||
          page.data?.url?.replace("/proiecte/", "").replace(/^\//, "");

        if (slug) {
          return {
            params: { slug: String(slug) },
          };
        }
        return null;
      })
      .filter((path): path is { params: { slug: string } } => path !== null);

    return {
      paths,
      fallback: "blocking", // Generate pages on-demand if not pre-built
    };
  } catch (error) {
    console.error("Error generating project paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export default ProjectPage;
