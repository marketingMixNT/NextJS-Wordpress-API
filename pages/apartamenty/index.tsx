import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllApartments } from "../../lib/api";
import Link from "next/link";

export default function Apartamenty({ allApartments: { edges }, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Apartamenty</title>
      </Head>
      <Container>
        <nav className="flex gap-4">
          <Link href={'/'}>Home</Link>
          <Link href={'/apartamenty'}>Apartamenty</Link>
        </nav>
        <h1>Lista Apartamentów</h1>
        <ul>
          {edges.map(({ node }) => {
            const { apartamentyFields } = node || {};
            const { nazwa, miniaturka } = apartamentyFields || {};
            const thumbnailUri ="https://nextjscms.mmhub.pl" + miniaturka?.node?.uri;

            if (!nazwa) {
              return null;
            }

            return (
              <li key={nazwa} className="flex items-center gap-4">
                {thumbnailUri && (
                  <img
                    src={thumbnailUri}
                    alt={`Miniaturka ${nazwa}`}
                    className="w-52 h-52 object-cover"
                  />
                )}
                <span>{nazwa}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allApartments = await getAllApartments(preview);

  return {
    props: { allApartments, preview },
    revalidate: 10,
  };
};
