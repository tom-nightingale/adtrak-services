import Container from './container'
import { motion } from 'framer-motion'

export default function Footer({ content }) {
    
    const logoVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: .5 },
    }

    return (
        <footer className="px-4 text-center">
            <Container>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={logoVariants}
                    transition={{duration: .5, delay: 6.5}}
                    className="max-w-md mx-auto my-24 text-center opacity-50 content"
                    dangerouslySetInnerHTML={{ __html: content }} 
                />
                
            </Container>
        </footer>
    )
}