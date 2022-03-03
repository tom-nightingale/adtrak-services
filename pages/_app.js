import { useEffect, useState } from 'react';
import '../styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { HeroContext } from '../context/HeroContext'
import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps }) {
    const { session } = pageProps;
    const router = useRouter();

    const [heroContext, setHeroContext] = useState(0);

    useEffect(() => {
        const handleRouteChange = (url) => { 

            var colours = ['#FF6B4A', '#3B5CC4', '#12284C', '#ABE8E8'];
            var rand = Math.floor(Math.random() * 3);
            document.body.style.background = colours[rand];
            
            window.setTimeout(() => window.scrollTo(0, 0), 1000)
        }
        router.events.on('routeChangeStart', handleRouteChange)
    }, [router.events])

    return (
        <Provider session={session}>
            <HeroContext.Provider value={[heroContext, setHeroContext]}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
            </HeroContext.Provider>            
        </Provider>
    )
}