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

export default function Home({ data: {home, social, socialTiers, site} }) {

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
            {renderMetaTags(social.seo.concat(site.faviconMetaTags))} 
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
              heroImage={social.heroImage}
              heroTitle={social.heroTitle}
              heroBlurb={social.heroBlurb}
              heroBgColor="bg-primary"
              heroTextColor="text-white"
              heroGradientHex="255, 107, 74"
              heroModifiers="pb-[320px]"
            />  

            <div className="w-full bg-white">

              <Container>

                  <div className="relative z-20 flex flex-wrap text-2xs hosting-options lg:text-base">

                    <motion.ul 
                      className="relative w-5/12 option-list"
                      initial="hidden"
                      animate="visible"
                      variants={listVariants}
                    >
                      {social.features.map((option, i) => {
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

                    <div className="w-7/12">

                      <div className="flex flex-wrap w-full h-full">

                        {socialTiers.map((tier, i) => {
                          return (
                            
                          <div className="w-1/3" key={i}>

                            <motion.div 
                              key={tier.title}
                              initial="hidden"
                              animate="visible"
                              variants={tierVariants}
                              transition={{duration: .5, delay: 2.5}}
                              className={`flex flex-col items-center leading-snug text-center bg-white border-l border-b border-gray-200 ${tier.mostPopular ? 'rounded-t-4xl mt-[-148px] lg:mt-[-173px] xl:mt-[-178px] 2xl:mt-[-188px]' : 'mt-[-126px] lg:mt-[-131px] xl:mt-[-142px] 2xl:mt-[-142px]'} text-secondary-dark ${i == 0 ? 'rounded-tl-4xl' : '' } ${i+1 === socialTiers.length ? 'rounded-tr-4xl' : ''} `}>
                              
                              <div className={`relative w-full py-6 ${tier.mostPopular ? 'pt-14' : ''} `}>

                                {tier.mostPopular &&
                                  <MostPopular />
                                }
                              
                                <p className="px-2 leading-tight text-center xs:px-8">
                                  <span className="text-xs font-semibold opacity-50 xl:text-lg font-display">{tier.title}</span>
                                </p>
                                <p className="flex flex-col mt-4 leading-tight">
                                  <span className="text-lg font-semibold leading-none xl:text-xl font-display">£{tier.price}</span>
                                  <span className="font-light opacity-50 text-2xs">{tier.nickname}</span>
                                </p>
                              </div>
                              
                            </motion.div>
                            

                            <motion.ul
                              className={` ${i+1 <= socialTiers.length ? 'border-l border-gray-200' : '' } ${tier.mostPopular ? "shadow-xl rounded-3xl pb-4 text-xs relative z-40 border-l-0" : "text-xs"} overflow-hidden`}
                              initial="hidden"
                              animate="visible"
                              variants={listVariants}
                            >

                              <Feature feature={tier.boostingBudgetForPromotedPosts} text={true}/>
                              <Feature feature={tier.brandedGraphics} />
                              <Feature feature={tier.communityEngagement} />
                              <Feature feature={tier.inboxAutoResponding} />
                              <Feature feature={tier.jobPostings} />    
                              <Feature feature={tier.notificationMonitoring} />
                              <Feature feature={tier.numberOfPosts} text={true}/>
                              <Feature feature={tier.numberOfSocialMediaPlatforms} text={true}/>
                              <Feature feature={tier.quarterlyReporting} />
                              <Feature feature={tier.schedulingToolAccess} />

                            </motion.ul>
                            
                          </div>
                          )
                        })}

                      </div>

                    </div>

                  </div>

                </Container>              
              
            </div>        

            <Footer content={social.disclaimer} />

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
        ... on SocialRecord {
          pageTitle
          heroTitle
          slug
        }
      }
    }
    social {
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
    socialTiers : allSocialTiers {
      title
      price
      nickname
      mostPopular
      boostingBudgetForPromotedPosts
      brandedGraphics
      communityEngagement
      inboxAutoResponding
      jobPostings    
      notificationMonitoring
      numberOfPosts
      numberOfSocialMediaPlatforms
      quarterlyReporting
      schedulingToolAccess
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
