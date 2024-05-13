import {motion} from "framer-motion";
import {socket} from "../../contexts/WebsocketContext";

const container = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.3
        }
    }
};
const EmojiButtonSet = () => {

    const sendEmoji = (emoji) => {
        socket.emit('shareEmojiMsg', {emoji})
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-row overflow-x-auto space-x-4 p-4 mt-2">
            <motion.button
                onClick={() => sendEmoji('😀')}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{backgroundColor: "#FFC0CB", borderRadius: "9999px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                className="text-3xl px-4 py-2 focus:outline-none"
            >
                😀
            </motion.button>
            <motion.button
                onClick={() => sendEmoji('😄')}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{backgroundColor: "#87CEEB", borderRadius: "9999px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                className="text-3xl px-4 py-2 focus:outline-none"
            >
                😄
            </motion.button>
            <motion.button
                onClick={() => sendEmoji('😊')}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{backgroundColor: "#FFD700", borderRadius: "9999px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                className="text-3xl px-4 py-2 focus:outline-none"
            >
                😊
            </motion.button>
            <motion.button
                onClick={() => sendEmoji('😎')}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{backgroundColor: "#00FA9A", borderRadius: "9999px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                className="text-3xl px-4 py-2 focus:outline-none"
            >
                😎
            </motion.button>
            <motion.button
                onClick={() => sendEmoji('🥳')}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{backgroundColor: "#FF6347", borderRadius: "9999px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                className="text-3xl px-4 py-2 focus:outline-none"
            >
                🥳
            </motion.button>
            {/* Add more emoji buttons as needed */}
        </motion.div>
    );
};

export default EmojiButtonSet;
