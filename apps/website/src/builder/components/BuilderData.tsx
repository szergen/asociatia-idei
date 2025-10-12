import React from "react";
import { builder } from "@builder.io/react";

interface BuilderDataProps {
  model?: string;
  query?: Record<string, any>;
  children: (data: any) => React.ReactNode;
  fallback?: React.ReactNode;
}

// Headless Builder.io component for data fetching
const BuilderData: React.FC<BuilderDataProps> = ({
  model = "data",
  query = {},
  children,
  fallback = null,
}) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const content = await builder
          .get(model, {
            query,
            options: {
              includeRefs: true,
            },
          })
          .toPromise();

        setData(content?.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching Builder data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model, JSON.stringify(query)]);

  if (loading) {
    return (
      fallback || (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      )
    );
  }

  if (error) {
    console.error("Builder data error:", error);
    return fallback;
  }

  return <>{children(data)}</>;
};

export default BuilderData;

// Hook for fetching Builder.io data
export const useBuilderData = (
  model: string = "data",
  query: Record<string, any> = {}
) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const content = await builder
          .get(model, {
            query,
            options: {
              includeRefs: true,
            },
          })
          .toPromise();

        setData(content?.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching Builder data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model, JSON.stringify(query)]);

  return { data, loading, error };
};

// Hook for fetching multiple Builder.io entries
export const useBuilderList = (model: string = "data", options: any = {}) => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const content = await builder.getAll(model, {
          ...options,
          options: {
            includeRefs: true,
            noTargeting: true,
            ...(options?.options || {}),
          },
        });

        setData(content || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching Builder list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model, JSON.stringify(options)]);

  return { data, loading, error };
};
