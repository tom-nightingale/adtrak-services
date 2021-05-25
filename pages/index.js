import Head from 'next/head'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from '../components/layout'
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

            <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-primary">
                    
              <img className="mx-auto mb-8" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
              
              <p>Please login to see our services.</p>

              

            </div>

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
