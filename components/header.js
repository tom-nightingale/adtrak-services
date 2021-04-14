import { useRouter } from 'next/router'
import MobileMenu from '../components/mobile-menu'
import { Image } from "react-datocms";
import Container from './container'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header({ navLinks, heroImage, heroTitle, heroBlurb }) {

    const router = useRouter();
    const currentLink = router.pathname.replace('/', '');
    console.log(currentLink);

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
        
        <header className="relative z-10 p-8 pb-64 overflow-hidden lg:py-12 lg:pb-116 bg-secondary-dark">
            
            <motion.div
              key="logo"
              initial="hidden"
              animate="visible"
              variants={logoVariants}
              transition={{duration: .5}}
            >
              <Container>

                <div className="flex flex-wrap justify-between w-full">

                  <Link href="/">
                      <a className="block">
                        <img className="mx-auto lg:m-0" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
                      </a>
                  </Link>

                  <div className="hidden md:block">
                    {navLinks.map((link, i) => {
                      return(
                          <Link key={i} href={link.slug} scroll={false}>
                            <a aria-label={`Go to ${link.heroTitle}`} className={`inline-flex items-center p-2 mx-4 text-white transition-all duration-500 hover:no-underline group hover:text-primary ${currentLink === link.slug ? 'text-secondary-light' : ''}`}>
                              {link.heroTitle}
                            </a>
                          </Link>
                      )
                    })}
                    </div>
                  </div>
              </Container>   
            </motion.div>
            
            <motion.div
              key="heroImage"
              initial="hidden"
              animate="visible"
              variants={heroImageVariants}
              transition={{duration: 1}}
              className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden opacity-10 gradient-fade lg:w-3/5">
                <Image width={900} height={750} pictureClassName="h-full object-center object-cover" alt="Hosting with Adtrak" className="absolute bottom-0 left-0 h-full" data={heroImage.responsiveImage} /> 
            </motion.div>

            <div className="relative z-20 w-full max-w-md mx-auto mt-8 text-center text-white lg:mt-24">

              <motion.h1 
                key="heroMsg"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1}}
                className="mb-2 text-lg font-semibold font-display xs:text-xl lg:text-2xl text-secondary-light" role="heading" aria-level="1">{heroTitle}</motion.h1>

                <motion.div 
                key="heroBlurb"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
                transition={{duration: .5, delay: 1.5}}
                className="font-sans font-light lg:text-lg content"
                dangerouslySetInnerHTML={{ __html: heroBlurb }} />
                
            </div>  
                
        </header>
        </>
    )
}