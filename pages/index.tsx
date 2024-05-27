import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { getAllHeroSlides } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import Slider from '../components/Slider'

export default function Index({ allSlides, preview }) {
  const edges = allSlides?.edges || [];

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Strona Hotelowa z CMS ${CMS_NAME}`}</title>
      </Head>

        {edges.map(({ node }, index) => {
          const { fieldsImg } = node || {};
          const { zdjecie } = fieldsImg || {};
          const imgUri = "https://nextjscms.mmhub.pl" + zdjecie?.node?.uri;

          return (
      //       <header className="h-screen w-full bg-no-repeat bg-cover bg-center flex overflow-hidden bg-blend-multiply bg-gray-300" style={{
      //         backgroundImage: `url('${imgUri}')`,
      //       }}>

            
      // </header>
      <>
      <p>test</p>
      <Slider/>
      </>
          );
        })}
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
