import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BannerBlocks = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.3 }
        }
    };

    const blockVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <motion.div
            ref={ref}
            className="flex gap-6 justify-center mt-20"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <motion.div className="w-40 h-40 bg-blue-500 rounded-lg shadow-lg" variants={blockVariants}>
                Block 1
            </motion.div>
            <motion.div className="w-40 h-40 bg-green-500 rounded-lg shadow-lg" variants={blockVariants}>
                Block 2
            </motion.div>
            <motion.div className="w-40 h-40 bg-red-500 rounded-lg shadow-lg" variants={blockVariants}>
                Block 3
            </motion.div>
        </motion.div>
    );
};

export default BannerBlocks;
