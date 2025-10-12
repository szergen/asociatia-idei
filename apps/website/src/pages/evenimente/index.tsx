import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";
import { BuilderSection, useBuilderList } from "../../builder";

interface EventsPageProps {
  headerSection?: any;
  filterSection?: any;
}

const EventsPage: React.FC<EventsPageProps> = ({
  headerSection,
  filterSection,
}) => {
  // Use Builder.io hook to fetch projects data
  const {
    data: events,
    loading,
    error,
  } = useBuilderList("project", {
    query: {
      // Remove the data.type filter since we're using the project model directly
      // "data.published": true,
    },
    limit: 20,
  });
  console.log("DEBUG: Events data:", events);

  return (
    <Layout>
      <Head>
        <title>Evenimente - Asociația IDEI</title>
        <meta
          name="description"
          content="Descoperă evenimentele prin care Asociația IDEI face diferența în comunitate și promovează dezvoltarea durabilă."
        />
      </Head>

      {/* Header Section - Builder.io content or fallback */}
      {headerSection ? (
        <BuilderSection content={headerSection} className="events-header" />
      ) : (
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Evenimentele Noastre</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Descoperă cum facem diferența în comunitate prin evenimente
              inovatoare și inițiative pentru dezvoltarea durabilă.
            </p>
          </div>
        </section>
      )}

      {/* Filter Section - Builder.io content */}
      {filterSection && (
        <BuilderSection content={filterSection} className="events-filter" />
      )}

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-gray-600">
                A apărut o eroare la încărcarea evenimentelor.
              </p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: any) => (
                <ProjectCard key={event.id} project={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Încă nu avem evenimente
              </h2>
              <p className="text-gray-600">
                Evenimentele vor fi disponibile în curând.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vrei să Te Implici?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Căutăm mereu oameni pasionați care să se alăture misiunii noastre.
            Descoperă cum poți contribui la evenimentele noastre.
          </p>
          <a
            href="/implica-te"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Implică-te
          </a>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  try {
    // This could also use getBuilderPageData for sections
    const [headerSection, filterSection] = await Promise.all([
      // getBuilderPageData('section', '/projects-header', { includeUnpublished: preview }),
      // getBuilderPageData('section', '/projects-filter', { includeUnpublished: preview }),
      Promise.resolve(null), // Placeholder - will use fallback content
      Promise.resolve(null), // Placeholder - will use fallback content
    ]);

    return {
      props: {
        headerSection,
        filterSection,
      },
      //   revalidate: 300, // Revalidate every 5 minutes
      revalidate: 1, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error("Error fetching projects page content:", error);
    return {
      props: {
        headerSection: null,
        filterSection: null,
      },
      //   revalidate: 300,
      revalidate: 1,
    };
  }
};

export default EventsPage;
