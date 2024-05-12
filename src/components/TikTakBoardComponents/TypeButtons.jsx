import {motion} from "framer-motion";

export default function TypeButtons() {
    return (
        <div className='flex gap-2 mt-3'>
            <motion.div
                variants={{
                    hidden: {x: -20, opacity: 0},
                    visible: {
                        x: 0,
                        opacity: 1
                    }
                }}
                transition={{delay: 0.5}}
                initial='hidden'
                animate='visible'
                className="w-50 bg-zinc-900 text-center text-cyan-500 rounded-lg shadow-md h-20 d-center font-bold pointer"
            >
                <motion.button whileHover={{scale: 1.05}}
                               whileTap={{scale: 0.97}} style={{fontSize: '2.5rem'}}>O
                </motion.button>
            </motion.div>
            <motion.div
                variants={{
                    hidden: {x: 20, opacity: 0},
                    visible: {
                        x: 0,
                        opacity: 1
                    }
                }}
                transition={{delay: 0.5}}
                initial='hidden'
                animate='visible'
                className="w-50 bg-zinc-900 text-center text-yellow-500 rounded-lg shadow-md h-20 d-center font-bold pointer"
            >
                <motion.button whileHover={{scale: 1.05}}
                               whileTap={{scale: 0.97}} style={{fontSize: '2.5rem'}}>X
                </motion.button>
            </motion.div>
        </div>
    );
}