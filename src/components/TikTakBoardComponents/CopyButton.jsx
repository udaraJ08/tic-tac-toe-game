import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { socket } from '../../contexts/WebsocketContext';
import copyAudio from '../../assets/audio/copy.mp3'

const FluidDiv = () => {
    const location = useLocation();
    const [copyTriggered, setCopyTriggered] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (copyTriggered) {
            const audio = new Audio(copyAudio);
            timeoutId = setTimeout(() => {
                audio.play();
                setCopyTriggered(false); // Reset copyTriggered after 1 second
            }, 1000);
        }

        // Clean up the timeout
        return () => clearTimeout(timeoutId);
    }, [copyTriggered]);

    const handleCopyTheCode = () => {
        window.navigator.clipboard.writeText(location?.state?.code);
        socket.emit('shareEmojiMsg', { emoji: 'Share the love ❤️', code: location?.state?.code });
        setCopyTriggered(true);
    };

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: -50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            className="absolute right-0 top-0 flex items-center justify-between w-64 bg-white rounded-lg shadow-lg p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="text-lg text-black mr-2">{location?.state?.code}</div>
            <motion.button
                onClick={handleCopyTheCode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
                Copy
            </motion.button>
        </motion.div>
    );
};

export default FluidDiv;
