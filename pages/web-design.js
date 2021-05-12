import { useState } from 'react';
import Head from 'next/head'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import { motion } from 'framer-motion'
import { renderMetaTags } from "react-datocms";
import { fade, tierVariants, listVariants, featureVariants } from "../lib/transitionHelpers"

export default function Home({ data: {home, webDesign, webTiers, site} }) {

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
            {renderMetaTags(webDesign.seo.concat(site.faviconMetaTags))} 
        </Head>  

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
        > 

        <motion.div variants={fade}>

          <Header
            navLinks={home.heroLinks} 
            heroImage={webDesign.heroImage}
            heroTitle={webDesign.heroTitle}
            heroBlurb={webDesign.heroBlurb}
            heroBgColor="bg-primary"
            heroTextColor="text-white"
            heroGradientHex="255, 107, 74"
          /> 

          <div className="w-full bg-white">

            <Container>

              <div className="relative z-20 flex flex-wrap text-2xs hosting-options lg:text-base">

                <motion.ul 
                  className="relative w-1/3 option-list"
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                >
                  {webDesign.features.map((option, i) => {
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

                <div className="w-2/3">

                  <div className="flex flex-wrap w-full h-full">

                    {webTiers.map((tier, i) => {
                      return (
                        
                      <div className="w-1/4" key={i}>

                        <motion.div 
                          key={tier.title}
                          initial="hidden"
                          animate="visible"
                          variants={tierVariants}
                          transition={{duration: .5, delay: 2.5}}
                          className={`flex flex-col items-center leading-snug text-center bg-white ${tier.mostPopular ? 'rounded-t-4xl mt-[-152px] 3xl:mt-[-174px] bg-secondary-dark text-white' : 'mt-[-88px] 3xl:mt-[-110px]'} text-secondary-dark ${i == 0 ? 'rounded-tl-4xl' : '' } ${i == 3 ? 'rounded-tr-4xl' : ''}`}>
                          
                          <div className={`relative w-full py-6 ${tier.mostPopular ? 'py-14' : ''} `}>

                            {tier.mostPopular &&
                              <p className="absolute flex flex-wrap items-center justify-center px-4 py-2 font-light text-center transform -translate-x-1/2 rounded-full xl:w-4/5 -top-4 left-1/2 text-2xs bg-secondary-light text-secondary-dark">
                                <img className="block mx-auto xl:mx-0 xl:mr-2 lg:-mt-1 lg:inline-block" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
                                <span className="hidden xl:inline-block">Most Popular!</span>
                              </p>
                            }
                          
                            <p className="px-2 leading-tight text-center xs:px-8">
                              <span className={`text-xs font-semibold 3xl:text-xl font-display ${tier.mostPopular ? 'text-white' : ''} `}>{tier.title}<span className="text-primary">.</span></span>
                            </p>
                            <p className="flex flex-col leading-tight">                             
                              <span className={`text-xs font-light opacity-50 ${tier.mostPopular ? 'text-white' : ''}`}>Website</span>
                            </p>
                          </div>
                          
                        </motion.div>
                        

                        <motion.ul
                          className={tier.mostPopular ? "shadow-xl rounded-3xl text-xs relative z-40" : "text-xs"}
                          initial="hidden"
                          animate="visible"
                          variants={listVariants}
                        >
                          <motion.li variants={featureVariants}>{(tier.dedicatedAccountManage) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.uxWorkshop) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.customSitemap) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.contentManagementSystem) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.freeSslCertificate) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.freeSeoSetup) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.professionalCopywriting) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.changeImagesandColours) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.contactAndQuickQuoteForms) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.bespokeDesign) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.advancedFeaturesIntegrations) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.layoutAmendments) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.secureOnlinePayments) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.responsiveDesignOptimisedForMobileDevices) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                          <motion.li variants={featureVariants}>{(tier.socialMediaIntegration) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                        </motion.ul>
                        
                      </div>
                      )
                    })}

                  </div>

                </div>

              </div>

            </Container>            
            
          </div>        

          <Footer content={webDesign.disclaimer} />

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
    webDesign {
      heroTitle
      heroBlurb
      heroImage {
        responsiveImage(imgixParams: {fm: png, w:900, h:750, crop: entropy, fit: crop, blendMode: luminosity}) {
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
    webTiers: allWebDesignTiers {
      title
      mostPopular
      dedicatedAccountManager
      uxWorkshop
      customSitemap
      contentManagementSystem
      freeSslCertificate
      freeSeoSetup
      professionalCopywriting
      changeImagesAndColours
      contactAndQuickQuoteForms
      bespokeDesign
      advancedFeaturesIntegrations
      layoutAmendments
      secureOnlinePayments
      responsiveDesignOptimisedForMobileDevices
      socialMediaIntegration
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
