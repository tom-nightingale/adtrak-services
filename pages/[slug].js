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

export default function Page ({ data : { site, page, home } }) {

    console.log(page.features);

    const [session, loading] = useSession();

    const [modal, showModal] = useState(false);

    function handleModal(desc) {
        showModal(true);
        document.querySelector('.modal-content').innerHTML = desc;
    }

    function handleClose() {
        showModal(false);
    }  
    
    return(
        <Layout>

        <Head>
            {renderMetaTags(page.seo.concat(site.faviconMetaTags))} 
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
                heroImage={page.heroImage}
                heroTitle={page.heroTitle}
                heroBlurb={page.heroBlurb}
                heroBgColor="bg-secondary"
                heroGradientHex="59, 92, 196"
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
                      {page.features.map((option, i) => {
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

                        {page.linkedTiers.map((tier, i) => {
                          return (
                            
                          <div className="w-1/3" key={i}> {/* to do...replace with switch statement for width classnames */}

                            <motion.div 
                              key={tier.title}
                              initial="hidden"
                              animate="visible"
                              variants={tierVariants}
                              transition={{duration: .5, delay: 2.5}}
                              className={`flex flex-col items-center leading-snug text-center bg-white border-l border-b border-gray-200 ${tier.mostPopular ? 'rounded-t-4xl mt-[-161px] lg:mt-[-174px]' : 'mt-[-129px] lg:mt-[-142px]'} text-secondary-dark ${i == 0 ? 'rounded-tl-4xl' : '' } ${i+1 == page.linkedTiers.length ? 'rounded-tr-4xl' : ''} `}>
                              
                              <div className="relative w-full py-6">
                                <p className="px-2 leading-tight text-center xs:px-8">
                                  <span className="text-xs font-semibold opacity-50 xl:text-lg font-display">{tier.title}</span>
                                </p>
                                <p className="flex flex-col leading-tight">
                                  <span className="py-2 text-lg font-semibold leading-none xl:text-xl font-display">{tier.price}</span>
                                  {tier.nickname &&
                                    <span className="font-light opacity-50 text-2xs">{tier.nickname}</span>
                                  }
                                </p>
                              </div>
                              
                            </motion.div>
                            

                             <motion.ul
                              className={` ${i+1 <= page.linkedTiers.length ? 'border-l border-gray-200' : '' } ${i === page.linkedTiers.length ? 'border-l-0' : '' } ${tier.mostPopular ? "shadow-xl rounded-3xl pb-4 text-xs relative z-40 border-l-0" : "text-xs"} overflow-hidden`}
                              initial="hidden"
                              animate="visible"
                              variants={listVariants}
                            >

                              {/* <Feature feature={tier.healthChecks} />
                              <Feature feature={tier.analyticsAnalysis} />
                              <Feature feature={tier.algorithmCompliance} />
                              <Feature feature={tier.citationBuildingMaintenance} />
                              <Feature feature={tier.googleMyBusiness} />
                              <Feature feature={tier.quarterlyPerformanceReview} />
                              <Feature feature={tier.rankTracking} text={true} />
                              <Feature feature={tier.ongoingOptimisation} />
                              <Feature feature={tier.backlinkProfileAnalysis} />
                              <Feature feature={tier.advancedLinkBuilding} />
                              <Feature feature={tier.articleManagement} />
                              <Feature feature={tier.reviewsManagement} />
                              <Feature feature={tier.siteSpeedManagement} />
                              <Feature feature={tier.contentMarketing} />
                              <Feature feature={tier.uxAnalysis} />
                              <Feature feature={tier.cro} />
                              <Feature feature={tier.extendedLandingPages} />
                              <Feature feature={tier.digitalPr} />
                              <Feature feature={tier.graphicDesign} />
                              <Feature feature={tier.organicSocialMedia} />
                              <Feature feature={tier.paidSocialMedia} />
                              <Feature feature={tier.photography} />
                              <Feature feature={tier.videography} />
                              <Feature feature={tier.animation} /> */}

                            </motion.ul> 
                            
                          </div>
                          )
                        })}

                        

                      </div>

                    </div>

                  </div>

                </Container>
                
              </div>        

              <Footer content={page.disclaimer} />

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
};

const QUERY = `
    query Page($slug: String) {
        site: _site {
            faviconMetaTags {
                ...metaTagsFragment
            }
        }
        page(filter: {slug: {eq: $slug}}) {
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
            linkedTiers {
              ... on HostingOptionRecord {
                title
                mostPopular
                price
                nickname
              }
              ... on InternetMarketingTierRecord {
                title
                mostPopular
                price
                nickname
              }
              ... on PaidMarketingTierRecord {
                title
                mostPopular
                price
                nickname
              }
              ... on SocialTierRecord {
                title
                mostPopular
                price
                nickname
              }
              ... on WebDesignTierRecord {
                title
                mostPopular
                price
                nickname
              }
            }
            disclaimer
            seo: _seoMetaTags {
                ...metaTagsFragment
            }
        }
        home {
          heroLinks {
            slug
            pageTitle
          }
        }
        
    }
    ${metaTagsFragment}
    ${responsiveImageFragment}
`

export async function getStaticProps({ params }) {
    const slug = params;
    
    const data = await request({
        query: QUERY,
        variables: slug,
    });
    
    return {
        props: { data }
    }
}


export async function  getStaticPaths() {
    const data = await request( {
        query: `{ allPages { slug } }` 
    });
    return {
        paths: data.allPages.map((page) => `/${page.slug}`),
        fallback: false,
    }
}

