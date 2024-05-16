import { motion } from "framer-motion";
import {socket} from "../../contexts/WebsocketContext";
import {useLocation} from "react-router-dom";

const EmojiFloat = ({emoji}) => {

    const getRandomPos = () => {
        return Math.random() * 100 - 100
    }

    return (
        <motion.div
            initial={{ opacity: 0, bottom: 10, x: getRandomPos() }}
            animate={{ opacity: 1, top: -200 }}
            exit={{ opacity: 1, top: 0 }}
            transition={{ duration: 2.2, delay: 0.5 }}
            style={{
                zIndex: -1
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        >
            <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl"
            >
                {emoji}
            </motion.span>
        </motion.div>
    );
};

export default EmojiFloat;
