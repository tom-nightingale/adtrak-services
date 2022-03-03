import { useState } from 'react';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import Link from 'next/link'

export default function mobileMenu({navItems}) {

    const router = useRouter();
    let currentLink = router.pathname.replace('/', '');
    

    //State management for mobile menu
    const [open, setOpen] = useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: {
        opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };

    return (
        <>
            <button aria-label="Open Menu" open={open} onClick={() => setOpen(!open)} className={`absolute top-0 right-0 z-50 btn-menu xl:hidden ${open ? 'open' : ''}`}>
                <span />
                <span />
                <span />
            </button>

            {/* Mobile Menu */}
            <div open={open} className={`fixed top-0 left-0 w-full h-full p-4 transition-all duration-200 bg-secondary-dark xl:hidden ${open ? 'opacity-100 z-40' : 'opacity-0'}`}>
                
                <div className="flex flex-col items-center justify-center h-full">

                <motion.div variants={container} initial="hidden" animate={open ? 'show' : ''}>

                    <motion.div variants={listItem}>
                    <img src="images/adtrak-logo.svg" alt="Adtrak Media Limited" className="w-20 mx-auto mb-8 text-white" />
                    </motion.div>

                    
                    {navItems.map((link, i) => {
                        return(
                        <motion.div className="mb-6 text-center" key={i} variants={listItem}>
                            <Link href={link.slug} scroll={false}>
                                <a aria-label={`Go to ${link.pageTitle}`} onClick={() => setOpen(!open)} className={`block text-center no-underline ${currentLink === link.slug ? 'text-secondary-light' : 'text-white' }`}>
                                    {link.pageTitle}
                                </a>
                            </Link>
                        </motion.div>
                        )
                    })}
                    
                    <motion.div className="text-center" variants={listItem}>
                    
                    </motion.div>

                </motion.div>

                </div>
            </div>
            {/* End Mobile Menu */}
        </>
    )
}