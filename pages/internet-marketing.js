import { useState } from 'react';
import Head from 'next/head'
import { request } from "../lib/datocms";
import { renderMetaTags } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { fade, tierVariants, listVariants, featureVariants } from "../lib/transitionHelpers"
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import { motion } from 'framer-motion'


export default function Home({ data: {home, internetMarketing, imTiers, site} }) {

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
            {renderMetaTags(internetMarketing.seo.concat(site.faviconMetaTags))} 
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
              heroImage={internetMarketing.heroImage}
              heroTitle={internetMarketing.heroTitle}
              heroBlurb={internetMarketing.heroBlurb}
              heroBgColor="bg-secondary"
              heroGradientHex="59, 92, 196"
              headerModifiers=""
            />        

            <div className="w-full bg-white">

              <Container>

                <div className="relative z-20 flex flex-wrap text-2xs hosting-options lg:text-base">

                  <motion.ul 
                    className="relative w-1/4 option-list"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                  >
                    {internetMarketing.features.map((option, i) => {
                      return (
                        <motion.li variants={featureVariants} key={i}>
                          <span className="relative z-10">{option.title}</span>
                          <button className="relative z-50 ml-4 transition-all duration-1000 opacity-50 text-2xs hover:opacity-100" aria-label="Expand information" onClick={() => handleModal(option.description)}>
                            <img className="w-4 h-4 text-primary" src={`images/icon-info.svg`} alt="View more information" />
                          </button>
                        </motion.li>
                      )
                    })}
                  </motion.ul>

                  <div className="w-3/4">

                    <div className="flex flex-wrap w-full h-full">

                      {imTiers.map((tier, i) => {
                        return (
                          
                        <div className="w-1/6" key={i}>

                          <motion.div 
                            key={tier.title}
                            initial="hidden"
                            animate="visible"
                            variants={tierVariants}
                            transition={{duration: .5, delay: 2.5}}
                            className={`flex flex-col items-center leading-snug text-center bg-white ${tier.mostPopular ? '-mt-38 lg:-mt-45 rounded-t-4xl' : '-mt-38 lg:-mt-39 2xl:-mt-39'} text-secondary-dark ${i == 0 ? 'rounded-tl-4xl' : '' } ${i == 5 ? 'rounded-tr-4xl' : ''}`}>
                            
                            <div className={`relative w-full py-6 ${tier.mostPopular ? 'pt-14' : ''} `}>

                              {tier.mostPopular &&
                                <p className="absolute flex flex-wrap items-center justify-center px-4 py-2 font-light text-center transform -translate-x-1/2 rounded-full xl:w-4/5 -top-4 left-1/2 text-2xs bg-secondary-light text-secondary-dark">
                                  <img className="block mx-auto xl:mx-0 xl:mr-2 lg:-mt-1 lg:inline-block" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
                                  <span className="hidden xl:inline-block">Most Popular!</span>
                                </p>
                              }
                            
                              <p className="px-2 leading-tight text-center xs:px-8">
                                <span className="text-xs font-semibold opacity-50 lg:text-lg font-display">{tier.title}</span>
                              </p>
                              <p className="flex flex-col mt-4 leading-tight">
                                <span className="text-lg font-semibold leading-none lg:text-xl font-display">£{tier.price}</span>
                                <span className="text-xs font-light opacity-50">{tier.nickname}</span>
                              </p>
                            </div>
                            
                          </motion.div>
                          

                          <motion.ul
                            className={tier.mostPopular ? "shadow-xl rounded-3xl text-xs relative z-40" : "text-xs"}
                            initial="hidden"
                            animate="visible"
                            variants={listVariants}
                          >
                            <motion.li variants={featureVariants}>{(tier.healthChecks) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.analyticsAnalysis) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.algorithmCompliance) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.citationBuildingMaintenance) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.googleMyBusiness) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.quarterlyPerformanceReview) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants} className="font-display lg:text-base">{tier.rankTracking}</motion.li>
                            <motion.li variants={featureVariants}>{(tier.ongoingOptimisation) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.backlinkProfileAnalysis) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.advancedLinkBuilding) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.articleManagement) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.reviewsManagement) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.siteSpeedManagement) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.uxAnalysis) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.cro) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.digitalPr) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.organicSocialMedia) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.paidSocialMedia) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.graphicDesign) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.photography) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.videography) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                            <motion.li variants={featureVariants}>{(tier.animation) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>

                          </motion.ul>
                          
                        </div>
                        )
                      })}

                    </div>

                  </div>

                </div>

              </Container>
              
            </div>        

            <Footer content={internetMarketing.disclaimer} />

          </motion.div>

        </motion.div>

        <motion.div className={`modal fixed z-50 p-4 bg-primary text-white text-center transition-all duration-1000 bottom-0 left-0 w-full text-2xs ${modal ? 'opacity-full' : 'opacity-0'}`}>
          <>
            <button className="absolute top-4 right-4" onClick={() => handleClose()}>Close</button>
            <p className="modal-content">...</p>
          </>
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
    internetMarketing {
      heroTitle
      heroBlurb
      heroImage {
        responsiveImage(imgixParams: {fm: png, w:900, h:750, crop: entropy, fit: crop, blendMode: multiply}) {
          ...responsiveImageFragment
        }
      }
      features {
        title
        description
      }
      disclaimer
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    imTiers : allInternetMarketingTiers {
      title
      price
      mostPopular
      nickname
      healthChecks
      analyticsAnalysis
      algorithmCompliance
      citationBuildingMaintenance
      googleMyBusiness
      quarterlyPerformanceReview
      rankTracking
      ongoingOptimisation
      backlinkProfileAnalysis
      advancedLinkBuilding
      articleManagement
      reviewsManagement
      siteSpeedManagement
      uxAnalysis
      cro
      digitalPr
      organicSocialMedia
      paidSocialMedia
      graphicDesign
      photography
      videography
      animation
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
