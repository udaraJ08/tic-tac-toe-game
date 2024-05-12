import { motion } from "framer-motion";

export default function Slider({setScale, scale}) {

    return (
        <motion.div
            className="absolute top-0 left-0 mt-4 ml-4 bg-white rounded-lg shadow-md p-2"
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
                className="slider appearance-none w-64 h-2 bg-gray-200 rounded-full"
            />
        </motion.div>
    );
}