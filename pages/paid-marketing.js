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
import { motion } from 'framer-motion'
import Feature from "../components/feature";
import MostPopular from "../components/most-popular";
import { useSession } from 'next-auth/client';

export default function Home({ data: {home, paidMarketing, pmTiers, site} }) {

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
            {renderMetaTags(paidMarketing.seo.concat(site.faviconMetaTags))} 
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
              heroImage={paidMarketing.heroImage}
              heroTitle={paidMarketing.heroTitle}
              heroBlurb={paidMarketing.heroBlurb}
              heroBgColor="bg-secondary"
              heroGradientHex="59, 92, 196"
              heroModifiers="pb-[320px]"
            />  

            <div className="w-full bg-white">



              {/* Start PM */}

                <Container>

                    <div className="relative z-20 flex flex-wrap text-2xs hosting-options lg:text-base">

                      <motion.ul 
                        className="relative w-5/12 option-list"
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                      >
                        <motion.li variants={featureVariants}>
                          <span className="relative z-10">Recommended Monthly Ad Spend</span>
                        </motion.li>
                        {paidMarketing.features.map((option, i) => {
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

                      <div className="w-1/2">

                        <div className="flex flex-wrap w-full h-full">

                          {pmTiers.map((tier, i) => {
                            return (
                              
                            <div className="w-1/3" key={i}>

                              <motion.div 
                                key={tier.title}
                                initial="hidden"
                                animate="visible"
                                variants={tierVariants}
                                transition={{duration: .5, delay: 2.5}}
                                className={`flex flex-col items-center leading-snug text-center bg-white border-l border-b border-gray-200 ${tier.mostPopular ? 'rounded-t-4xl mt-[-148px] lg:mt-[-173px] xl:mt-[-178px] 2xl:mt-[-188px]' : 'mt-[-16px] lg:mt-[-141px] xl:mt-[-146px] 2xl:mt-[-156px]'} text-secondary-dark ${i == 0 ? 'rounded-tl-4xl' : '' } ${i == 5 ? 'rounded-tr-4xl' : ''} `}>
                                
                                <div className={`relative w-full py-6 ${tier.mostPopular ? 'pt-14' : ''} `}>

                                  {tier.mostPopular &&
                                    <MostPopular />
                                  }
                                
                                  <p className="px-2 leading-tight text-center xs:px-8">
                                    <span className="text-xs font-semibold opacity-50 xl:text-lg font-display">{tier.title}</span>
                                    <span className="block font-light opacity-50 text-2xs">{tier.nickname}</span>
                                  </p>
                                  <p className="flex flex-col mt-4 leading-tight">
                                    <span className="font-semibold leading-none 2xl:text-xl font-display">{tier.managementFee} <span className="block font-sans font-light opacity-50 text-2xs ">Management Fee</span></span>
                                  </p>
                                </div>
                                
                              </motion.div>
                              

                              <motion.ul
                                className={` ${i+1 <= pmTiers.length ? 'border-l border-gray-200' : '' } ${tier.mostPopular ? "shadow-xl rounded-3xl pb-4 text-xs relative z-40 border-l-0" : "text-xs"} overflow-hidden`}
                                initial="hidden"
                                animate="visible"
                                variants={listVariants}
                              >
                                <Feature feature={tier.minimumAdSpend} text={true} />
                                <Feature feature={tier.goalTracking} />
                                <Feature feature={tier.quarterlyReporting} />
                                <Feature feature={tier.negativeKeywords} />
                                <Feature feature={tier.keywordBidCheck} />
                                <Feature feature={tier.budgetChecks} />
                                <Feature feature={tier.googleAdScripts} />
                                <Feature feature={tier.campaignUpdates} />
                                <Feature feature={tier.removeUnderperformingKeywords} />
                                <Feature feature={tier.keywordCtrChecks} />
                                <Feature feature={tier.clickFraudProtection} />
                                <Feature feature={tier.locations} text={true} />
                                <Feature feature={tier.dedicatedConsultant} />
                                <Feature feature={tier.impressionShareAnalysis} />
                                <Feature feature={tier.competitorAnalysis} />
                                <Feature feature={tier.brandCampaigns} />
                                <Feature feature={tier.advertCopyOptimisation} />
                                <Feature feature={tier.advertPositionOptimisation} />
                                <Feature feature={tier.adgroupSplitting} />
                                <Feature feature={tier.landingPageOptimisation} />
                                <Feature feature={tier.campaignTests} />
                                <Feature feature={tier.auctionInsightsReport} />
                                <Feature feature={tier.accessToBetaApplications} />
                                <Feature feature={tier.demographicsAnalysis} />
                                <Feature feature={tier.multiChannelPerformance} />
                                <Feature feature={tier.crossDeviceConversionPaths} />
                                <Feature feature={tier.analyticsAccess} />
                                <Feature feature={tier.advancedTelecomsAnalysis} />
                                <Feature feature={tier.youtubeAdvertising} />
                                <Feature feature={tier.facebookAds} />
                                <Feature feature={tier.linkedinAds} />
                                <Feature feature={tier.microsoftAdsSetup} />
                                <Feature feature={tier.splitTestingSoftware} />
                                <Feature feature={tier.googleDisplayNetwork} />
                                <Feature feature={tier.remarketingListForSearchAds} />
                                <Feature feature={tier.shoppingAds} />

                              </motion.ul>
                              
                            </div>
                            )
                          })}

                        </div>

                      </div>

                    </div>

                  </Container>

              {/* End PM */}

              
              
            </div>        

            <Footer content={paidMarketing.disclaimer} />

          </>
          )}

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
      features {
        title
        description
      }
      disclaimer
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    pmTiers : allPaidMarketingTiers {
      title
      nickname
      mostPopular
      minimumAdSpend
      managementFee
      goalTracking
      quarterlyReporting
      negativeKeywords
      keywordBidCheck
      budgetChecks
      googleAdScripts
      campaignUpdates
      removeUnderperformingKeywords
      keywordCtrChecks
      clickFraudProtection
      locations
      dedicatedConsultant
      impressionShareAnalysis
      competitorAnalysis
      brandCampaigns
      advertCopyOptimisation
      advertPositionOptimisation
      adgroupSplitting
      landingPageOptimisation
      campaignTests
      auctionInsightsReport
      accessToBetaApplications
      demographicsAnalysis
      multiChannelPerformance
      crossDeviceConversionPaths
      analyticsAccess
      advancedTelecomsAnalysis
      youtubeAdvertising
      facebookAds
      linkedinAds
      microsoftAdsSetup
      splitTestingSoftware
      googleDisplayNetwork
      remarketingListForSearchAds
      shoppingAds
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
