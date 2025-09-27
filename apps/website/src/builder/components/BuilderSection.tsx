import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";

interface BuilderSectionProps {
  model?: string;
  name?: string;
  content?: any;
  data?: Record<string, any>;
  className?: string;
}

// Section-based Builder.io component for embedding in existing pages
const BuilderSection: React.FC<BuilderSectionProps> = ({
  model = "section",
  name,
  content,
  data = {},
  className = "",
}) => {
  // If content is provided directly, use it
  if (content) {
    return (
      <div className={className}>
        <BuilderComponent
          model={model}
          content={content}
          data={{
            locale: "ro",
            timestamp: Date.now(),
            ...data,
          }}
        />
      </div>
    );
  }

  // If name is provided, fetch content by name
  if (name) {
    return (
      <div className={className}>
        <BuilderComponent
          model={model}
          name={name}
          data={{
            locale: "ro",
            timestamp: Date.now(),
            ...data,
          }}
        />
      </div>
    );
  }

  return null;
};

export default BuilderSection;

// Hook for fetching section content
export const useBuilderSection = (name: string, model: string = "section") => {
  const [content, setContent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const sectionContent = await builder
          .get(model, {
            query: {
              name: name,
            },
            options: {
              includeRefs: true,
            },
          })
          .toPromise();

        setContent(sectionContent);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching Builder section:", err);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchContent();
    }
  }, [name, model]);

  return { content, loading, error };
};
