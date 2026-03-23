import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { BuilderSection, BuilderSymbol, getBuilderPageData } from "../builder";
import ProjectCard from "../components/ProjectCard";

interface HomePageProps {
  heroSection?: any;
  aboutSection?: any;
  projectsSection?: any;
  testimonialsSection?: any;
  featuredProjects?: any[];
}

const PLACEHOLDER_PROJECTS = [1, 2, 3].map((n) => ({
  id: `placeholder-${n}`,
  data: {
    title: `Proiect ${n}`,
    description: "Descrierea proiectului și impactul pe care îl are în comunitate.",
    url: `/proiecte/proiect-${n}`,
  },
}));

const HomePage: React.FC<HomePageProps> = ({
  heroSection,
  aboutSection,
  projectsSection,
  testimonialsSection,
  featuredProjects = [],
}) => {
  const displayedProjects = [
    ...featuredProjects.slice(0, 3),
    ...PLACEHOLDER_PROJECTS,
  ].slice(0, 3);
  return (
    <>
      <Head>
        <title>Asociația IDEI - Acasă</title>
        <meta
          name="description"
          content="Asociația IDEI promovează dezvoltarea durabilă prin proiecte inovatoare și educație de calitate. Împreună construim o comunitate mai bună pentru viitor."
        />
        <meta property="og:title" content="Asociația IDEI - Acasă" />
        <meta
          property="og:description"
          content="Promovăm dezvoltarea durabilă prin proiecte inovatoare și educație de calitate."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero Section - Builder.io content or fallback */}
      {heroSection ? (
        <BuilderSection content={heroSection} className="hero-section" />
      ) : (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Bine ai venit la Asociația IDEI
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Promovăm dezvoltarea durabilă prin proiecte inovatoare și educație
              de calitate. Împreună construim o comunitate mai bună pentru
              viitor.
            </p>
            <div className="space-x-4">
              <a
                href="/proiecte"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Explorează Proiectele
              </a>
              <a
                href="/implica-te"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Implică-te
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section - Builder.io content or fallback */}
      {aboutSection ? (
        <BuilderSection content={aboutSection} className="about-section" />
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Despre Asociația IDEI
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Suntem o organizație dedicată promovării dezvoltării durabile și
                educației de calitate în România prin proiecte inovatoare și
                parteneriate strategice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Educație</h3>
                <p className="text-gray-600">
                  Promovăm educația de calitate și dezvoltarea competențelor
                  pentru viitor.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunitate</h3>
                <p className="text-gray-600">
                  Construim o comunitate puternică prin proiecte colaborative și
                  inițiative sociale.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Inovație</h3>
                <p className="text-gray-600">
                  Dezvoltăm soluții inovatoare pentru provocările sociale și de
                  mediu.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section - Builder.io content or fallback */}
      {projectsSection ? (
        <BuilderSection
          content={projectsSection}
          className="projects-section"
        />
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Proiectele Noastre
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Descoperă proiectele prin care facem diferența în comunitate și
                promovăm dezvoltarea durabilă.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="/proiecte"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Vezi Toate Proiectele
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials/CTA Section - Builder.io Symbol */}
      <BuilderSymbol
        name="homepage-cta"
        className="cta-section"
        data={{
          defaultTitle: "Alătură-te Misiunii Noastre",
          defaultDescription:
            "Împreună putem face diferența! Descoperă cum te poți implica în proiectele noastre.",
          defaultButtonText: "Implică-te Acum",
        }}
      />

      {/* Newsletter Section - Always show fallback, but can be enhanced with Builder.io */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Rămâi la Curent cu Noutățile
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Abonează-te la newsletter-ul nostru pentru a primi ultimele noutăți
            despre proiectele și evenimentele noastre.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-blue-800 px-6 py-3 rounded-r-lg hover:bg-blue-900 transition-colors font-semibold">
              Abonează-te
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const { builder } = await import("../builder");

  try {
    const [
      heroSection,
      aboutSection,
      projectsSection,
      testimonialsSection,
      projectPages,
    ] = await Promise.all([
      getBuilderPageData("section", "/homepage-hero", {
        includeUnpublished: preview,
      }),
      getBuilderPageData("section", "/homepage-about", {
        includeUnpublished: preview,
      }),
      getBuilderPageData("section", "/homepage-projects", {
        includeUnpublished: preview,
      }),
      getBuilderPageData("section", "/homepage-testimonials", {
        includeUnpublished: preview,
      }),
      builder.getAll("project-page", {
        limit: 3,
        options: {
          includeRefs: true,
          noTargeting: true,
        },
      }),
    ]);

    return {
      props: {
        heroSection: heroSection || null,
        aboutSection: aboutSection || null,
        projectsSection: projectsSection || null,
        testimonialsSection: testimonialsSection || null,
        featuredProjects: projectPages || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        heroSection: null,
        aboutSection: null,
        projectsSection: null,
        testimonialsSection: null,
        featuredProjects: [],
      },
      revalidate: 60,
    };
  }
};

export default HomePage;
