import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllApartmentsWithSlug, getApartmentBySlug } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'

import PersonIcon from '@mui/icons-material/Person';
import HeightIcon from '@mui/icons-material/Height';

export default function Apartment({ apartment, allApartments, preview }) {
  const title = apartment.apartamentyFields.nazwa
  const thumbnail = "https://nextjscms.mmhub.pl" + apartment.apartamentyFields.miniaturka.node.uri
  const persons = apartment.apartamentyFields.liczbaOsob
  const surface = apartment.apartamentyFields.metraz
  const price = apartment.apartamentyFields.cena
  const gallery = "https://nextjscms.mmhub.pl" + apartment.apartamentyFields.galeria.node.uri
  const description = apartment.apartamentyFields.opis

  const router = useRouter()

  if (!router.isFallback && !apartment?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const filteredApartments = allApartments.filter(apartament => apartament.slug !== apartment.slug)

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <div className='flex flex-col justify-center items-center gap-12'>
              <h1 className='text-center text-5xl uppercase mt-24'>{title}</h1>
              <Image src={thumbnail} alt={title} width={1000} height={1000} />
            </div>

            <div className='flex justify-around '>
              <div className="border border-black rounded-lg w-[450px] mt-12 p-6 space-y-4">
                <div className='flex justify-start items-center gap-4'><h2 className='text-2xl'>Maksymalna liczba osób:</h2><PersonIcon fontSize="large"/> <span>{persons} os.</span></div>
                <div className='flex justify-start items-center gap-4'><h2 className='text-2xl'>Powierzchnia:</h2><HeightIcon fontSize="large"/> <span>{surface} m²</span></div>
                <div className='flex justify-start items-center gap-4'><h2 className='text-2xl font-bold'>CENA:</h2><HeightIcon fontSize="large"/> <span>{price} zł</span></div>
              </div>
              <div className="border border-black rounded-lg w-[450px] mt-12 p-6 space-y-4">
                <h2 className='text-2xl'>Krótki opis:</h2>
                <p>{apartment.apartamentyFields.krotkiOpis}</p>
              </div>
            </div>

            <div className='my-20 '>
              <p className='mb-2 text-center font-semibold text-xs'>Do galeri trzeba wtyczke ACF PRO - koszt ok 15zł</p>
              <div className='flex gap-6'>
                <Image src={gallery} alt={title} width={500} height={500} />
                <Image src={gallery} alt={title} width={500} height={500} />
                <Image src={gallery} alt={title} width={500} height={500} />
              </div>
            </div>

            <div className='space-y-4 mb-20' dangerouslySetInnerHTML={{ __html: description }} />

            <div className=' border-gray-200 pt-8 mt-16 '>
              <h2 className='text-4xl mb-12 text-center '>Pozostałe Apartamenty</h2>


<div className='flex  justify-around gap-24 flex-wrap mb-24'>

{filteredApartments.map(apartament => (
                  <div className='border rounded-lg border-black w-1/3 flex flex-col justify-center items-center gap-10' key={apartament.slug}>
                    <Image src={`https://nextjscms.mmhub.pl/${apartament.apartamentyFields.miniaturka.node.uri}`} width={400} height={400} className='w-full max-h-[300px] object-cover'></Image>
                      <h2 className='text-3xl hover:underline'>{apartament.apartamentyFields.nazwa}</h2>
                    
                    <Link href={`/apartamenty/${apartament.slug}` } className="bg-black hover:bg-gray-700 duration-500 px-12 py-4 text-white rounded-lg mb-6">Przyjacielu zobacz</Link>
                  </div>
                ))}
</div>

             
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const { apartment, allApartments } = await getApartmentBySlug(params?.slug)

  return {
    props: {
      preview,
      apartment,
      allApartments,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllApartmentsWithSlug()

  return {
    paths: allPosts.edges.map(({ node }) => `/apartamenty/${node.slug}`) || [],
    fallback: true,
  }
}


