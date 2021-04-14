import { useState } from 'react';
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
          className="overflow-x-hidden"
        >  
          <motion.div variants={fade}>
        
            <Header
              navLinks={home.heroLinks} 
              heroImage={home.heroImage}
              heroTitle={home.heroTitle}
              heroBlurb={home.heroBlurb}
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
        responsiveImage(imgixParams: {fm: png, w:900, h:750, crop: entropy, fit: crop, blendMode: luminosity}) {
          ...responsiveImageFragment
        }
      }
      heroLinks {
        ... on HostingRecord {
          heroTitle
          slug
        }
        ... on InternetMarketingRecord {
          heroTitle
          slug
        }
        ... on PaidMarketingRecord {
          slug
          heroTitle
        }
        ... on WebDesignRecord {
          slug
          heroTitle
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
