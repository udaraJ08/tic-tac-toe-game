import { motion } from "framer-motion";
import { PRIMARY, SECONDARY } from "../../helpers/constants";
import { Fragment } from "react";

export default function TikTakSquare({ data }) {
    const handleType = () => {
        switch (data?.type) {
            case PRIMARY:
                return <p className='text-cyan-500'>O</p>;
            case SECONDARY:
                return <p className='text-yellow-300'>X</p>;
            default:
                return <Fragment />;
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ fontSize: '4.1rem' }}
            className="bg-zinc-900 text-center rounded-lg shadow-md w-24 h-24 d-center font-bold pointer"
        >
            {handleType()}
        </motion.div>
    );
}