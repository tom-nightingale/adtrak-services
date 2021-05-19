import { motion } from "framer-motion";
import { featureVariants } from "../lib/transitionHelpers"
import IconThumb from '../components/iconThumb'
import mostPopular from "./most-popular";

export default function Feature({ feature, text, mostPopular }) {
    return (
        <motion.li 
        className={`${text ? 'font-display lg:text-base' : ''} `} 
        variants={featureVariants}
        >
            {text &&
                feature
            }

            {!text && feature &&
                <IconThumb classes="bg-positive border-positive-dark" outcome="positive" />
            }

            {!text && !feature &&
                <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> 
            }
            
        </motion.li>
    )
}