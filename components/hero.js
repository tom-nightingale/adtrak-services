import { useRouter } from 'next/router'
import MobileMenu from '../components/mobile-menu'
import { Image } from "react-datocms";
import Container from './container'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header({ index, navLinks, heroImage, heroTitle, heroBlurb, heroLinks, heroTextColor, heroBgColor, heroGradientHex, headerModifiers}) {

    const router = useRouter();
    const currentLink = router.pathname.replace('/', '');

     const indexHeroImageVariants = {
        hidden: { marginTop: 200, opacity: 0 },
        visible: { marginTop: 0, opacity: 1 },
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
        
        <header className={`relative z-10 p-8 pt-32 ${index ? 'min-h-screen' : 'pb-[470px]'} overflow-hidden ${heroBgColor ? heroBgColor : 'bg-secondary-dark' } ${headerModifiers}`}>
            
            {!index && heroImage &&
              <motion.div
                key="heroImage"
                initial="hidden"
                animate="visible"
                variants={heroImageVariants}
                transition={{duration: 1}}
                className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden opacity-10 lg:w-3/5">
                  <div className="absolute top-0 bottom-0 right-0 z-10 w-1/5" style={{ background: `linear-gradient(90deg, rgba( ${heroGradientHex} ,0) 0%, rgba(${heroGradientHex} ,1) 100%)` }}></div>
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
                className={`mb-2 text-lg font-semibold font-display leading-snug xs:text-xl lg:text-2xl ${heroTextColor ? heroTextColor : 'text-secondary-light'} `} role="heading" aria-level="1">{heroTitle}</motion.h1>

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
                <div className="relative z-10 flex flex-wrap justify-center mt-8 lg:mt-20">
                  {heroLinks.map((item, i) => {
                    return(
                      <div className="flex flex-wrap w-full p-4 sm:w-1/2 md:w-1/4" key={i}>
                        <Link href={item.slug} scroll={false}>
                          <a className="flex flex-col justify-center w-full p-4 leading-snug text-center transition-all duration-500 bg-white rounded-2xl lg:text-lg sm:text-left 2xl:p-12 sm:p-8 xl:text-xl font-display text-secondary-dark hover:no-underline hover:text-primary">
                            <div className="lg:w-1/2">
                              {item.pageTitle}
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
                transition={{duration: 2.5}}
                className="absolute left-0 top-2/3">
                  <Image width={900} height={750} alt="Hosting with Adtrak" data={heroImage.responsiveImage} /> 
              </motion.div>
            }
                
        </header>
        </>
    )
}