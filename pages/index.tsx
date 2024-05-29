import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { getAllHeroSlides } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import Slider from '../components/Slider';

export default function Index({ allSlides, preview }) {
  const edges = allSlides?.edges || [];

  // Zbierz wszystkie imgUri w tablicę
  const imgUris = edges.map(({ node }) => {
    const { fieldsImg } = node || {};
    const { zdjecie } = fieldsImg || {};
    return "https://nextjscms.mmhub.pl" + zdjecie?.node?.uri;
  });

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Strona Hotelowa z CMS ${CMS_NAME}`}</title>
      </Head>

      {/* Przekaż tablicę imgUris do komponentu Slider */}
      <Slider imgUris={imgUris} />

      {/* <Container>
        <p>test</p>
      </Container> */}
      <main>
        
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allSlides = await getAllHeroSlides(preview);

  return {
    props: { allSlides, preview },
    revalidate: 10,
  };
};
