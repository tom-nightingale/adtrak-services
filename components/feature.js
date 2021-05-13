import { motion } from "framer-motion";
import { featureVariants } from "../lib/transitionHelpers"
import IconThumb from '../components/iconThumb'

export default function Feature({ feature }) {
    return (
        <motion.li 
        className="" 
        variants={featureVariants}
        >
            {(feature) ? 
                <IconThumb classes="bg-positive border-positive-dark" outcome="positive" /> 
              : <IconThumb classes="bg-negative border-negative-dark" outcome="negative" /> 
            }
        </motion.li>
    )
}