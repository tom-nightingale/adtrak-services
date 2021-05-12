import Head from 'next/head'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from '../components/layout'
import Header from '../components/header'
import { renderMetaTags } from "react-datocms";
import { motion } from "framer-motion"
import { fade } from "../lib/transitionHelpers"


export default function Home({ data: {home, site} }) {

  return (

    <Layout>

        <Head>
            {renderMetaTags(home.seo.concat(site.faviconMetaTags))} 
        </Head>  

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
        >  
         
          <motion.div variants={fade}>
        
            <Header
              index={true}
              navLinks={home.heroLinks} 
              heroTitle={home.heroTitle}
              heroImage={home.heroImage}
              heroBlurb={home.heroBlurb}
              heroBgColor="bg-primary"
              heroTextColor="text-white"
              heroLinks={home.heroLinks}
            />

          </motion.div>

        </motion.div>
        
    </Layout>

  )
}

const HOMEPAGE_QUERY = `
  query HomePage {
    site: _site {
      faviconMetaTags {
        ...metaTagsFragment
      }
    }
    home {
      heroTitle
      heroBlurb
      heroImage {
        responsiveImage(imgixParams: {fm: png, w:1920, h:796, crop: entropy, fit: crop }) {
          ...responsiveImageFragment
        }
      }
      heroLinks {
        ... on HostingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on InternetMarketingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on PaidMarketingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on WebDesignRecord {
          pageTitle
          heroTitle
          slug
        }
      }
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }
  ${metaTagsFragment}
  ${responsiveImageFragment}
`

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY
  })
  return {
    props: { data }
  }
}
