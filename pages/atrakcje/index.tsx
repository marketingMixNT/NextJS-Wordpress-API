'use client'

import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllAttractions } from "../../lib/api";
import Link from "next/link";
import { HoverEffect } from "../../components/ui/card-hover-effect";

import Image from "next/image";

export default function Atrakcje({ allAttractions: { edges }, preview }) {
  // Map edges to create a new attractions array
  // const attractions = edges.map(({ node }) => {
  //   const { atrakcjeFields } = node || {};
  //   const { nazwa } = atrakcjeFields || {};
  //   const { opis } = atrakcjeFields || {};

  //   return {
  //     title: nazwa,
  //     description: opis,
  //     link: "#",
  //   };
  // });

  return (
    <Layout preview={preview}>
      <Head>
        <title>Atrakcje</title>
      </Head>
      <Container>
        
        <h1 className="text-center mt-12 text-5xl uppercase">Lista atrakcji</h1>

        <div className="flex gap-12 flex-col justify-center items-center my-12">
          {edges.map(({ node },index) => {
            const { atrakcjeFields, slug } = node || {};
            const { nazwa, miniaturka, opis } = atrakcjeFields || {};
            const thumbnailUri = "https://nextjscms.mmhub.pl" + miniaturka?.node?.uri;

            if (!nazwa) {
              return null;
            }

            const isEven = index % 2 === 0;
            const orderEven = isEven ? "order-1" : "";
          
            return (
              <div key={slug} className="border rounded-lg  flex  justify-between items-center gap-12  ">
                <div className={`w-1/2 ${orderEven} `}>
                  <Image src={thumbnailUri} alt={`Miniaturka ${nazwa}`} width={400} height={400} className="w-full h-full object-cover object-cover" />
                </div>
                <div className="w-1/2 flex flex-col justify-start items-start text-left gap-6">
                  <h2 className="text-5xl uppercase">{nazwa}</h2>
                  <p className=" ">{opis}</p>
                </div>
              </div>
            );
          })}
          
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allAttractions = await getAllAttractions(preview);

  return {
    props: { allAttractions, preview },
    revalidate: 10,
  };
};
