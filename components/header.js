import { useRouter } from 'next/router';
import Container from '../components/container';
import Link from 'next/link';

export default function header({ navLinks }) {

    const router = useRouter();
    const currentLink = router.pathname.replace('/', '');
    
    return (
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
    )
}