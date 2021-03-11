import Head from 'next/head'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import FancyLink from '../components/fancyLink'
import { motion, MotionConfig } from 'framer-motion'
import { Image, renderMetaTags } from "react-datocms";

export default function Home({ data: {home, site, hostingOptions} }) {

  const options = [
    'Free SSL Certificate',
    'Backups',
    'Uptime',
    'Unlimited Visitors',
    'Dedicated High Availability Architecture',
    'Protected Nameservers',
    'Dedictaed DDOS Protection',
    'Recommended for Ecommerce',
    'Clickfraud PPC protection',
    'Reactive Server Monitoring',
    'Regular Security Patching',
    '24/7 Threat Protection',
    'HTTP/2 Enabled Servers',
  ];

  const heroImageVariants = {
    hidden: { left: -200, opacity: 0 },
    visible: { left: 0, opacity: .1},
  }

  const logoVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const hostingVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {y: 0, opacity: 1},
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 3,
        delayChildren: 3,
        staggerChildren: 0.25
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y:0 }
  }

  return (

    <Layout>

        <Head>
            {renderMetaTags(home.seo.concat(site.faviconMetaTags))} 
        </Head>  

        <header className="relative p-8 pb-64 overflow-hidden lg:py-12 lg:pb-116 lg:min-h-90 bg-secondary-dark">
              
            <motion.div
              key="heroImage"
              initial="hidden"
              animate="visible"
              variants={heroImageVariants}
              transition={{duration: 1}}
              className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden opacity-10 gradient-fade lg:w-3/5">
                <Image width={900} height={750} pictureClassName="h-full object-center object-cover" className="absolute bottom-0 left-0 h-full" data={home.heroImage.responsiveImage} /> 
            </motion.div>
            
            <motion.div
              key="logo"
              initial="hidden"
              animate="visible"
              variants={logoVariants}
              transition={{duration: .5}}
            >
              <Container>
                  <img className="mx-auto lg:m-0" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
              </Container>   
            </motion.div>
            
            <div className="relative z-20 w-full max-w-md mx-auto mt-8 text-center text-white lg:mt-24">

              <motion.h1 
                key="heroMsg"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1}}
                className="mb-2 text-lg font-semibold font-display xs:text-xl lg:text-2xl text-secondary-light" role="heading" aria-level="1">{home.heroTitle}</motion.h1>

              <motion.div 
                key="heroBlurb"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1.5}}
                className="font-sans font-light lg:text-lg content"
                dangerouslySetInnerHTML={{ __html: home.heroBlurb }} />
              
            </div>  
                
        </header>

        <div className="w-full">

          <Container>

            <div className="flex flex-wrap text-2xs hosting-options lg:text-base">

              <motion.ul 
                className="w-6/16 option-list"
                initial="hidden"
                animate="visible"
                variants={listVariants}
              >
                {options.map((option, i) => {
                  return (
                    <motion.li variants={itemVariants}>
                      <span class="relative z-10">{option}</span>
                    </motion.li>
                  )
                })}
              </motion.ul>

              <div className="w-10/16">

                <div className="flex flex-wrap w-full h-full md:w-11/12 2xl:w-4/5">

                  {hostingOptions.map((option, i) => {
                    return (
                      
                    <div className="w-1/2" key={i}>

                      {(i == 0) ? (
                        <motion.div 
                          key={option.title}
                          initial="hidden"
                          animate="visible"
                          variants={hostingVariants}
                          transition={{duration: .5, delay: 2}}
                          className="flex flex-col items-center leading-snug text-center text-white 2xl:-mt-86 -mt-50 lg:-mt-84 4xl:-mt-87 rounded-t-4xl bg-secondary">
                          
                          <p className="relative flex flex-wrap items-center px-4 py-2 -mt-4 font-light rounded-full text-2xs bg-secondary-light text-secondary-dark">
                            <img className="block mx-auto lg:-mt-1 lg:mr-2 lg:inline-block" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
                            <span class="hidden lg:inline-block">Most Popular!</span>
                            </p>
                          
                          <div className="w-full py-4 2xl:py-8">
                            <p className="px-6 leading-tight text-center md:px-12 lg:px-12 xl:px-16 2xl:px-0">
                              <span className="text-lg font-semibold lg:text-xl font-display">{option.title}<span className="text-primary">.</span></span>
                              <span className="block font-light opacity-50 lg:text-lg">Hosting</span>
                            </p>
                            <p className="flex flex-col pt-4 mt-4 leading-tight border-t border-white lg:pt-8 2xl:py-8 lg:mt-8 border-opacity-10">
                              <span className="text-lg font-semibold leading-none lg:text-3xl font-display">£{option.price}</span>
                              <span className="font-light opacity-50 lg:text-lg">per month</span>
                            </p>
                          </div>
                          
                        </motion.div>
                      ) : (
                        <motion.div 
                          key={option.title}
                          initial="hidden"
                          animate="visible"
                          variants={hostingVariants}
                          transition={{duration: .5, delay: 2.5}}
                          className="flex flex-col items-center leading-snug text-center bg-white rounded-tl-none -mt-39 lg:-mt-62 2xl:-mt-62 text-secondary-dark rounded-t-4xl">
                          
                          <div className="w-full py-6">
                            <p className="px-6 leading-tight text-center md:px-12 lg:px-2">
                              <span className="text-lg font-semibold lg:text-xl font-display">{option.title}<span className="text-primary">.</span></span>
                              <span className="block font-light opacity-50 lg:text-lg">Hosting</span>
                            </p>
                            <p className="flex flex-col mt-4 leading-tight">
                              <span className="text-lg font-semibold leading-none lg:text-3xl font-display">£{option.price}</span>
                              <span className="font-light opacity-50 lg:text-lg">per month</span>
                            </p>
                          </div>
                          
                        </motion.div>
                      )}

                      <motion.ul
                        className={(i == 0) ? "shadow-xl rounded-3xl text-xs" : "text-xs"}
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                      >
                        <motion.li variants={itemVariants}>{(option.freeSslCertificate) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> }</motion.li>
                        <motion.li variants={itemVariants} class="font-semibold font-display text-base">{option.backups}</motion.li>
                        <motion.li variants={itemVariants} class="font-semibold font-display text-base">{option.uptime}</motion.li>
                        <motion.li variants={itemVariants}>{(option.unlimitedVisitors) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.dedicatedHighAvailabilityArchitecture) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.protectedNameservers) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.dedicatedDdosProtection) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.recommendedForEcommerce) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.clickfraudPpcProtection) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.reactiveServerMonitoring) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.regularSecurityPatching) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.threatProtection) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                        <motion.li variants={itemVariants}>{(option.http2EnabledServers) ? <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" />}</motion.li>
                      </motion.ul>
                      
                    </div>
                    )
                  })}

                </div>

              </div>


            </div>

          </Container>
          
        </div>        

        <Footer content={home.disclaimer} />

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
      disclaimer
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
      http2EnabledServers
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
