import { useState } from 'react';
import Head from 'next/head'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import FancyLink from '../components/fancyLink'
import { motion } from 'framer-motion'
import { renderMetaTags } from "react-datocms";
import { fade } from "../lib/transitionHelpers"

export default function Home({ data: {home, paidMarketing, site} }) {

  const [modal, showModal] = useState(false);

  function handleModal(desc) {
    showModal(true);
    document.querySelector('.modal-content').innerHTML = desc;
  }

  function handleClose() {
    showModal(false);
  }

  return (

    <Layout>

        <Head>
            {renderMetaTags(paidMarketing.seo.concat(site.faviconMetaTags))} 
        </Head>  

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
        > 
        
        <motion.div variants={fade}>

          <Header
            navLinks={home.heroLinks} 
            heroImage={paidMarketing.heroImage}
            heroTitle={paidMarketing.heroTitle}
            heroBlurb={paidMarketing.heroBlurb}
            heroGradientHex="18, 40, 76"
          />  

          <div className="w-full bg-white">

            
            
          </div>        

          <Footer content={paidMarketing.disclaimer} />

        </motion.div>

        <motion.div className={`modal fixed z-50 p-4 bg-primary text-white text-center transition-all duration-1000 bottom-0 left-0 w-full text-2xs ${modal ? 'opacity-full' : 'opacity-0'}`}>
          <>
            <button className="absolute top-4 right-4" onClick={() => handleClose()}>Close</button>
            <p className="modal-content">...</p>
          </>
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
    }
    paidMarketing {
      heroTitle
      heroBlurb
      heroImage {
        responsiveImage(imgixParams: {fm: png, w:900, h:750, crop: entropy, fit: crop, blendMode: luminosity}) {
          ...responsiveImageFragment
        }
      }
      disclaimer
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
