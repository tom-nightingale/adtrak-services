import { useRouter } from 'next/router'
import MobileMenu from '../components/mobile-menu'
import { Image } from "react-datocms";
import Container from './container'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header({ index, navLinks, heroImage, heroTitle, heroBlurb, heroLinks, heroTextColor, heroBgColor }) {

    const router = useRouter();
    const currentLink = router.pathname.replace('/', '');

     const indexHeroImageVariants = {
        hidden: { top: 200, opacity: 0 },
        visible: { top: 0, opacity: 1},
    }

    const heroImageVariants = {
        hidden: { left: -200, opacity: 0 },
        visible: { left: 0, opacity: .1},
    }

    const logoVariants = {
        hidden: { y: -10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    }

    return (
        <>
        <MobileMenu navItems={navLinks} />        

          <div className="absolute top-0 z-20 w-full pt-12">
            <Container>

              <div className="flex flex-wrap justify-between w-full px-8">

                <Link href="/">
                    <a className="block">
                      <img className="mx-auto lg:m-0" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
                    </a>
                </Link>

                <div className="hidden lg:block">
                  {navLinks.map((link, i) => {
                    return(
                        <Link key={i} href={link.slug} scroll={false}>
                          <a aria-label={`Go to ${link.pageTitle}`} className={`inline-flex items-center p-2 mx-4 text-white transition-all duration-500 group hover:underline  ${currentLink === link.slug ? 'text-secondary-light' : ''}`}>
                            {link.pageTitle}
                          </a>
                        </Link>
                    )
                  })}
                  </div>
                </div>
            </Container>   
          </div>        
        
        <header className={`relative z-10 p-8 pt-32 ${index ? '' : 'pb-64 lg:pb-116' } overflow-hidden lg:py-12 ${heroBgColor ? heroBgColor : 'bg-secondary-dark' }`}>
            
            {!index && heroImage &&
              <motion.div
                key="heroImage"
                initial="hidden"
                animate="visible"
                variants={heroImageVariants}
                transition={{duration: 1}}
                className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden opacity-10 gradient-fade lg:w-3/5">
                  <Image width={900} height={750} pictureClassName="h-full object-center object-cover" alt="Hosting with Adtrak" className="absolute bottom-0 left-0 h-full" data={heroImage.responsiveImage} /> 
              </motion.div>
            }

            <div className="relative z-20 w-full max-w-md mx-auto mt-8 text-center text-white lg:mt-24">

              <motion.h1 
                key="heroMsg"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1}}
                className={`mb-2 text-lg font-semibold font-display xs:text-xl lg:text-2xl ${heroTextColor ? heroTextColor : 'text-secondary-light'} `} role="heading" aria-level="1">{heroTitle}</motion.h1>

                <motion.div 
                key="heroBlurb"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1.5}}
                className="font-sans font-light lg:text-lg content"
                dangerouslySetInnerHTML={{ __html: heroBlurb }} />
                
            </div>  

            {heroLinks &&
              <Container>
                <div className="flex flex-wrap mt-8 lg:mt-20">
                  {heroLinks.map((item, i) => {
                    return(
                      <div className="flex flex-wrap w-full p-4 sm:w-1/2 md:w-1/4" key={i}>
                        <Link href={item.slug} scroll={false}>
                          <a className="flex flex-col justify-center w-full p-4 leading-snug text-center transition-all duration-500 bg-white rounded-2xl lg:text-lg sm:text-left 2xl:p-12 sm:p-8 xl:text-xl font-display text-secondary-dark hover:no-underline hover:text-primary">
                            <div class="lg:w-1/2">
                              {item.heroTitle}
                            </div>
                          </a>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </Container>
            }

            {index && heroImage &&
              <motion.div
                key="heroImage"
                initial="hidden"
                animate="visible"
                variants={indexHeroImageVariants}
                transition={{duration: 1}}
                className="">
                  <Image width={900} height={750} pictureClassName="" alt="Hosting with Adtrak" className="" data={heroImage.responsiveImage} /> 
              </motion.div>
            }
                
        </header>
        </>
    )
}