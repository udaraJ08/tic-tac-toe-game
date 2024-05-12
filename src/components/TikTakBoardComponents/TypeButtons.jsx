import { motion } from "framer-motion";

export default function TypeButtons() {
    return <motion.div className='flex gap-2 mt-3'>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: '2.5rem' }}
            className="w-50 bg-zinc-900 text-center text-cyan-500 rounded-lg shadow-md  h-20 d-center font-bold pointer"
        >
            O
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: '2.5rem' }}
            className="w-50 bg-zinc-900 text-center text-yellow-500 rounded-lg shadow-md  h-20 d-center font-bold pointer"
        >
            X
        </motion.button>
    </motion.div>
}