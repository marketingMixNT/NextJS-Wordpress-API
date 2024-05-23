import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllApartmentsWithSlug, getApartmentBySlug } from "../../lib/api";
import Link from "next/link";
export default function Apartment({ apartment, preview }) {
  const router = useRouter();

  if (!router.isFallback && !apartment?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
      <nav className="flex gap-4">
          <Link href={'/'}>Home</Link>
          <Link href={'/apartamenty'}>Apartamenty</Link>
        </nav>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (


            
          <>
            <h1>{apartment.apartamentyFields.nazwa}</h1>
            <img src={apartment.apartamentyFields.miniaturka.node.uri} alt={apartment.apartamentyFields.nazwa} />
            <p>{apartment.apartamentyFields.krotkiOpis}</p>
            <p>Liczba osób: {apartment.apartamentyFields.liczbaOsob}</p>
            <p>Metraż: {apartment.apartamentyFields.metraz}</p>
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const apartment = await getApartmentBySlug(params?.slug);

  return {
    props: {
      preview,
      apartment,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllApartmentsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/apartamenty/${node.slug}`) || [],
    fallback: true,
  };
};
