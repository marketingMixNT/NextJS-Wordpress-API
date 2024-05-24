'use client'

import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllApartments } from "../../lib/api";
import Link from "next/link";
import { HoverEffect } from "../../components/ui/card-hover-effect";

import Image from "next/image";

import PersonIcon from '@mui/icons-material/Person';
import HeightIcon from '@mui/icons-material/Height';


export default function Apartamenty({ allApartments: { edges }, preview }) {
  // Map edges to create a new projects array
  const projects = edges.map(({ node }) => {
    const { apartamentyFields } = node || {};
    const { nazwa } = apartamentyFields || {};
    const { krotkiOpis } = apartamentyFields || {};

    return {
      title: nazwa,
      description: krotkiOpis,
      link: "#",
    };
  });


  return (
    <Layout preview={preview}>
      <Head>
        <title>Apartamenty</title>
      </Head>
      <Container>
        
        <h1 className="text-center mt-12 text-5xl uppercase">Lista apartamentów </h1>

<div className="flex gap-12 flex-wrap justify-center items-center my-12">



        {edges.map(({ node }) => {
            const { apartamentyFields,slug } = node || {};
            const { nazwa, miniaturka,liczbaOsob,metraz,krotkiOpis } = apartamentyFields || {};
            const thumbnailUri ="https://nextjscms.mmhub.pl" + miniaturka?.node?.uri;


            console.log(apartamentyFields);
            if (!nazwa) {
              return null;
            }

            return (
            
               <div className="border rounded-lg w-1/4 flex flex-col justify-between items-center gap-3 min-h-[650px] pb-12">
               <Image  src={thumbnailUri}  alt={`Miniaturka ${nazwa}`} width={400} height={400} className=" h-[300px] w-full object-cover"/>
               <h2 className="text-3xl text-center">{nazwa}</h2>
               <p className="px-4 text-center">{krotkiOpis}</p>
               <div className="flex gap-12">
                <div><PersonIcon fontSize="large"/> <span className="text-sm">{liczbaOsob} os.</span></div>
                <div><HeightIcon fontSize="large"/> <span className="text-sm">{metraz} m²</span></div>
               </div>
               <Link href={`/apartamenty/${slug} ` } className="bg-black hover:bg-gray-700 duration-500 px-12 py-4 text-white rounded-lg">Przyjacielu zobacz</Link>               
              </div>

              
            );
          })}
    </div>

      
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