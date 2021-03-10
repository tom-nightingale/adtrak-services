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
import { Image, renderMetaTags } from "react-datocms";

export default function Home({ data: {home, site, hostingOptions} }) {

  const options = [
    'Free SSL Certificate',
    'Backups',
    'Uptime',
    'Unlimited Visitors',
    'Dedicated High Availabiliy Architecture',
    'Protected Nameservers',
    'Dedictaed DDOS Protection',
    'Recommended for Ecommerce',
    'Clickfraud PPC protection',
    'Reactive Server Monitoring',
    'Regular Security Patching',
    '24/7 Threat Protection',
    'HTTP/2 Enabled Servers',
  ];

  return (

    <Layout>

        <Head>
            {renderMetaTags(home.seo.concat(site.faviconMetaTags))} 
        </Head>  

        <header className="relative p-8 overflow-hidden lg:py-12 lg:min-h-90 bg-secondary-dark">
            
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <Image width={900} height={750} className="lg:w-3/5" data={home.heroImage.responsiveImage} /> 
            </div>
            
            <Container>
                <img className="mx-auto lg:m-0" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
            </Container>   
            
            <div className="w-full max-w-md mx-auto mt-8 text-center text-white lg:mt-24">

              <h1 className="mb-2 text-lg font-semibold font-display xs:text-xl lg:text-2xl text-secondary-light" role="heading" aria-level="1">{home.heroTitle}</h1>

              <div className="font-sans font-light lg:text-lg content" dangerouslySetInnerHTML={{ __html: home.heroBlurb }} />
              
            </div>  
                
        </header>

        <div className="w-full">

          <Container>

            <div className="flex flex-wrap hosting-options">

              <ul className="w-6/16 option-list">
                {options.map((option, i) => {
                  return (
                    <li key={i}>{option}</li>
                  )
                })}
              </ul>

              <div className="w-10/16">

                <div className="flex flex-wrap w-4/5 h-full">

                  {hostingOptions.map((option, i) => {
                    return (
                      
                    <div className="w-1/2" key={i}>

                      {(i == 0) ? (
                        <div className="flex flex-col items-center leading-snug text-center text-white -mt-83 rounded-t-4xl bg-secondary">
                          
                          <p className="flex flex-wrap items-center px-4 py-2 -mt-4 text-xs font-light rounded-full realtive bg-secondary-light text-secondary-dark">
                            <img className="inline-block mr-2 -mt-1" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
                            Most Popular!
                            </p>
                          
                          <div className="w-full py-8">
                            <p className="leading-tight">
                              <span className="text-xl font-semibold font-display">{option.title}<span className="text-primary">.</span></span>
                              <span className="block text-lg font-light opacity-50">Hosting</span>
                            </p>
                            <p className="flex flex-col pt-8 mt-8 leading-tight border-t border-white border-opacity-10">
                              <span className="text-3xl font-semibold leading-none font-display">£{option.price}</span>
                              <span className="text-lg font-light opacity-50">per month</span>
                            </p>
                          </div>
                          
                        </div>
                      ) : (
                        <div className="flex flex-col items-center leading-snug text-center bg-white rounded-tl-none -mt-68 text-secondary-dark rounded-t-4xl">
                          
                          <div className="w-full py-6">
                            <p className="leading-tight">
                              <span className="text-xl font-semibold font-display">{option.title}<span className="text-primary">.</span></span>
                              <span className="block text-lg font-light opacity-50">Hosting</span>
                            </p>
                            <p className="flex flex-col mt-4 leading-tight">
                              <span className="text-3xl font-semibold leading-none font-display">£{option.price}</span>
                              <span className="text-lg font-light opacity-50">per month</span>
                            </p>
                          </div>
                          
                        </div>
                      )}

                      <ul className={(i == 0) ? "shadow-xl rounded-3xl" : ""}>
                        <li>{(option.freeSslCertificate) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" /> }</li>
                        <li>{option.backups}</li>
                        <li>{option.uptime}</li>
                        <li>{(option.unlimitedVisitors) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.dedicatedHighAvailabilityArchitecture) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.protectedNameservers) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.dedicatedDdosProtection) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.recommendedForEcommerce) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.clickfraudPpcProtection) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.reactiveServerMonitoring) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.regularSecurityPatching) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.threatProtection) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                        <li>{(option.http2EnabledServers) ? <IconThumb outcome="positive" /> : <IconThumb outcome="negative" />}</li>
                      </ul>
                      
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
