import { useState } from 'react';
import Head from 'next/head'
import { request } from "../lib/datocms";
import { renderMetaTags } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { fade, tierVariants, listVariants, featureVariants } from "../lib/transitionHelpers"
import Layout from '../components/layout'
import Header from '../components/header'
import Hero from '../components/hero'
import Login from '../components/login'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import { motion } from 'framer-motion'
import Feature from "../components/feature";
import MostPopular from "../components/most-popular";
import { useSession } from 'next-auth/client';

export default function Home({ data: {home, hosting, site, hostingOptions} }) {

  const [session, loading] = useSession();

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
            {renderMetaTags(hosting.seo.concat(site.faviconMetaTags))} 
        </Head>  

        {session && (
          <Header navLinks={home.heroLinks} />
        )}

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
        > 

        <motion.div variants={fade}>

          {!session && (
            <Login />
          )} 


          {session && (
            <>
            <Hero
              navLinks={home.heroLinks} 
              heroImage={hosting.heroImage}
              heroTitle={hosting.heroTitle}
              heroBlurb={hosting.heroBlurb}
              heroGradientHex="18, 40, 76"
              heroModifiers="pb-[470px]"
            />

            <div className="w-full bg-white">

              <Container>

                <div className="relative z-20 flex flex-wrap text-2xs hosting-options lg:text-base">

                  <motion.ul 
                    className="relative w-6/16 option-list"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                  >
                    {hosting.features.map((tier, i) => {
                      return (
                        <motion.li variants={featureVariants} key={i}>
                          <span className="relative z-10">{tier.title}</span>
                          <button className="relative z-50 ml-4 transition-all duration-1000 opacity-50 text-2xs hover:opacity-100" aria-label="Expand information" onClick={() => handleModal(tier.description)}>
                            <img className="w-4 h-4 text-primary" src={`images/icon-info.svg`} alt="View more information" />
                          </button>
                        </motion.li>
                      )
                    })}
                  </motion.ul>

                  <div className="w-10/16">

                    <div className="flex flex-wrap w-full h-full md:w-11/12 2xl:w-4/5">

                      {hostingOptions.map((tier, i) => {
                        return (
                          
                        <div className="w-1/2" key={i}>

                          {(i == 0) ? (
                            <motion.div 
                              key={tier.title}
                              initial="hidden"
                              animate="visible"
                              variants={tierVariants}
                              transition={{duration: .5, delay: 2}}
                              className="flex flex-col items-center leading-snug text-center text-white mt-[-203px] sm:mt-[-223px] lg:mt-[-351px] xl:mt-[-351px] 2xl:mt-[-346px] rounded-t-4xl bg-secondary">

                              
                              
                              
                              <div className="relative w-full py-4 pt-14">

                              <MostPopular />
                              
                                <p className="px-2 leading-tight text-center xs:px-8 sm:px-5 md:px-12 lg:px-20 2xl:px-0">
                                  <span className="text-xs font-semibold sm:text-lg lg:text-xl font-display">{tier.title}<span className="text-primary">.</span></span>
                                  <span className="block font-light opacity-50 lg:text-lg">Hosting</span>
                                </p>
                                <p className="flex flex-col pt-4 mt-4 leading-tight border-t border-white lg:pt-8 2xl:py-8 lg:mt-8 border-opacity-10">
                                  <span className="text-lg font-semibold leading-none lg:text-3xl font-display">£{tier.price}</span>
                                  <span className="font-light opacity-50 lg:text-lg">per month</span>
                                </p>
                              </div>
                              
                            </motion.div>
                          ) : (
                            <motion.div 
                              key={tier.title}
                              initial="hidden"
                              animate="visible"
                              variants={tierVariants}
                              transition={{duration: .5, delay: 2.5}}
                              className="flex flex-col items-center leading-snug text-center bg-white mt-[-142px] lg:mt-[-241px] rounded-tl-none text-secondary-dark rounded-t-4xl">
                              
                              <div className="w-full py-6">
                                <p className="px-2 leading-tight text-center xs:px-8 md:px-12 lg:px-2">
                                  <span className="text-xs font-semibold lg:text-xl font-display">{tier.title}<span className="text-primary">.</span></span>
                                  <span className="block font-light opacity-50 lg:text-lg">Hosting</span>
                                </p>
                                <p className="flex flex-col mt-4 leading-tight">
                                  <span className="text-lg font-semibold leading-none lg:text-3xl font-display">£{tier.price}</span>
                                  <span className="font-light opacity-50 lg:text-lg">per month</span>
                                </p>
                              </div>
                              
                            </motion.div>
                          )}

                          <motion.ul
                            className={(i == 0) ? "shadow-xl rounded-3xl text-xs relative z-40 pb-4" : "text-xs"}
                            initial="hidden"
                            animate="visible"
                            variants={listVariants}
                          >
                            <Feature feature={tier.freeSslCertificate} />
                            <Feature feature={tier.backups} text={true} />
                            <Feature feature={tier.uptime} text={true} />
                            <Feature feature={tier.unlimitedVisitors} />
                            <Feature feature={tier.dedicatedHighAvailabilityArchitecture} />
                            <Feature feature={tier.protectedNameservers} />
                            <Feature feature={tier.dedicatedDdosProtection} />
                            <Feature feature={tier.recommendedForEcommerce} />
                            <Feature feature={tier.clickfraudPpcProtection} />
                            <Feature feature={tier.reactiveServerMonitoring} />
                            <Feature feature={tier.regularSecurityPatching} />
                            <Feature feature={tier.threatProtection} />
                          </motion.ul>
                          
                        </div>
                        )
                      })}

                    </div>

                  </div>


                </div>

              </Container>
              
            </div>        

            <Footer content={hosting.disclaimer} />

            <motion.div className={`modal fixed z-40 p-4 px-16 bg-primary text-white text-center transition-all duration-1000 bottom-0 left-0 w-full text-2xs ${modal ? 'opacity-full' : 'opacity-0'}`}>
              <>
                <button className="absolute top-4 right-4" onClick={() => handleClose()}>Close</button>
                <p className="modal-content">...</p>
              </>
            </motion.div>
          </>
          )}

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
        ... on WebDesignRecord {
          pageTitle
          heroTitle
          slug
        }
      }
    }
    hosting {
      heroTitle
      heroBlurb
      heroImage {
        responsiveImage(imgixParams: {fm: png, w:900, h:750, crop: entropy, fit: crop, blendMode: luminosity}) {
          ...responsiveImageFragment
        }
      }
      disclaimer
      features {
        title
        description
      }
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    hostingOptions: allHostingOptions {
      title
      price
      freeSslCertificate
      backups
      uptime
      unlimitedVisitors
      dedicatedHighAvailabilityArchitecture
      protectedNameservers
      dedicatedDdosProtection
      recommendedForEcommerce
      clickfraudPpcProtection
      reactiveServerMonitoring
      regularSecurityPatching
      threatProtection
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
