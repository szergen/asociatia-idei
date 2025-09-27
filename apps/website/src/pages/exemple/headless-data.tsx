import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { BuilderData, useBuilderData } from "../../builder";

// Example page showing headless Builder.io data usage
const HeadlessDataPage: React.FC = () => {
  // Example 1: Using the BuilderData component
  const ExampleWithComponent = () => (
    <BuilderData
      model="data"
      query={{ "data.type": "testimonial" }}
      fallback={
        <div className="bg-gray-100 p-4 rounded">
          <p>Loading testimonials...</p>
        </div>
      }
    >
      {(data) => (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">
            {data?.title || "Testimonial"}
          </h3>
          <p className="text-gray-600 mb-4">{data?.content}</p>
          <div className="flex items-center">
            {data?.author?.image && (
              <img
                src={data.author.image}
                alt={data.author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <p className="font-semibold">{data?.author?.name}</p>
              <p className="text-sm text-gray-500">{data?.author?.position}</p>
            </div>
          </div>
        </div>
      )}
    </BuilderData>
  );

  // Example 2: Using the useBuilderData hook
  const ExampleWithHook = () => {
    const {
      data: settings,
      loading,
      error,
    } = useBuilderData("data", {
      "data.type": "site-settings",
    }) as { data: any; loading: boolean; error: string | null };

    if (loading)
      return <div className="animate-pulse h-20 bg-gray-200 rounded"></div>;
    if (error)
      return <div className="text-red-600">Error loading settings</div>;

    return (
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-4">
          Site Settings (from Builder.io)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {settings?.siteName || "Asociația IDEI"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {settings?.contactEmail || "contact@asociatia-idei.ro"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Theme Color
            </label>
            <div className="mt-1 flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: settings?.themeColor || "#2563eb" }}
              ></div>
              <span className="text-sm text-gray-900">
                {settings?.themeColor || "#2563eb"}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maintenance Mode
            </label>
            <span
              className={`inline-flex px-2 py-1 text-xs rounded-full ${
                settings?.maintenanceMode
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {settings?.maintenanceMode ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Headless Data Example - Asociația IDEI</title>
        <meta
          name="description"
          content="Example page showing how to use Builder.io for headless data fetching"
        />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Headless Builder.io Data Examples
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            This page demonstrates how to use Builder.io as a headless CMS to
            fetch and display structured data without using Builder.io's visual
            page editor.
          </p>

          <div className="space-y-12">
            {/* Example 1: Component-based data fetching */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Example 1: Using BuilderData Component
              </h2>
              <p className="text-gray-600 mb-6">
                This example uses the BuilderData component to fetch testimonial
                data from Builder.io.
              </p>
              <ExampleWithComponent />
            </div>

            {/* Example 2: Hook-based data fetching */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Example 2: Using useBuilderData Hook
              </h2>
              <p className="text-gray-600 mb-6">
                This example uses the useBuilderData hook to fetch site settings
                from Builder.io.
              </p>
              <ExampleWithHook />
            </div>

            {/* Example 3: List data fetching */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Example 3: Fetching List Data
              </h2>
              <p className="text-gray-600 mb-6">
                Example of fetching multiple items (like blog posts, team
                members, etc.) from Builder.io.
              </p>
              <BuilderData
                model="data"
                query={{ "data.type": "team-member" }}
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                }
              >
                {(data) => {
                  // If data is an array, show multiple items
                  const items = Array.isArray(data)
                    ? data
                    : [data].filter(Boolean);

                  if (items.length === 0) {
                    return (
                      <div className="text-center py-8 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">
                          No team members found. Add some in Builder.io!
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {items.map((member: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow border"
                        >
                          {member.photo && (
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-20 h-20 rounded-full mx-auto mb-4"
                            />
                          )}
                          <h4 className="font-semibold text-center">
                            {member.name || `Team Member ${index + 1}`}
                          </h4>
                          <p className="text-sm text-gray-600 text-center">
                            {member.position}
                          </p>
                          {member.bio && (
                            <p className="text-sm text-gray-700 mt-2">
                              {member.bio}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                }}
              </BuilderData>
            </div>

            {/* Code Examples */}
            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">
                How to Set Up Data in Builder.io
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    1. Create a new "Data" model in Builder.io
                  </p>
                  <p className="text-gray-300 mb-2">
                    2. Add entries with the following structure:
                  </p>
                  <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                    {`{
  "type": "testimonial",
  "title": "Great Experience!",
  "content": "Working with Asociația IDEI was amazing...",
  "author": {
    "name": "John Doe",
    "position": "Community Member",
    "image": "https://example.com/photo.jpg"
  }
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">
                    3. Use the components in your code:
                  </p>
                  <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                    {`<BuilderData 
  model="data" 
  query={{ 'data.type': 'testimonial' }}
>
  {(data) => <div>{data.title}</div>}
</BuilderData>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeadlessDataPage;
