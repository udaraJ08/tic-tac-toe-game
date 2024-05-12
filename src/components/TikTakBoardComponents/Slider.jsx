import { motion } from "framer-motion";

export default function Slider({setScale, scale}) {

    return (
        <motion.div
            className="left-0 bg-sky-100 rounded-lg shadow-md p-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            <input
                type="range"
                min="1"
                max="2"
                step="0.25" // Adjust the step to control the increment rate
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="slider appearance-none w-64 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
        </motion.div>
    );
}