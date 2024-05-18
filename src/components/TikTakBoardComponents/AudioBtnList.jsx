import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BOO_EFFECT, COOL_EFFECT, GOOD_EFFECT, HAHA_EFFECT, HMM_EFFECT, YAY_EFFECT } from "../../helpers/constants";
import { socket } from "../../contexts/WebsocketContext";
import { useLocation } from "react-router-dom";

const Button = ({ emoji, title, sound, gradient, type }) => {
    const location = useLocation();
    const [isClicked, setIsClicked] = useState(false);

    const handleAudioEffect = () => {
        if (!isClicked) {
            setIsClicked(true);
            socket.emit('audioEffects', {
                name: type,
                code: location?.state?.code
            });
            setTimeout(() => {
                setIsClicked(false);
            }, 4000); // Debounce time
        }
    };

    return (
        <motion.button
            className="w-full py-4 text-white font-bold text-lg shadow-lg focus:outline-none"
            style={{
                backgroundImage: gradient,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAudioEffect}
        >
            {emoji} {title}
        </motion.button>
    );
};

const ButtonsGrid = () => {
    const buttons = [
        { emoji: "😂", title: "Ha Ha", sound: "laughter.mp3", gradient: 'linear-gradient(to right, #4FACFE, #00F2FE)', type: HAHA_EFFECT },
        { emoji: "👻", title: "Boo", sound: "boo.mp3", gradient: 'linear-gradient(to right, #FF4E50, #F9D423)', type: BOO_EFFECT },
        { emoji: "🎉", title: "Yay", sound: "cheer.mp3", gradient: 'linear-gradient(to right, #00C9FF, #92FE9D)', type: YAY_EFFECT },
        { emoji: "🤔", title: "Hmmm", sound: "thinking.mp3", gradient: 'linear-gradient(to right, #36D1DC, #5B86E5)', type: HMM_EFFECT },
        { emoji: "😎", title: "Cool", sound: "cool.mp3", gradient: 'linear-gradient(to right, #43C6AC, #F8FFAE)', type: COOL_EFFECT },
        { emoji: "👍", title: "Good", sound: "good.mp3", gradient: 'linear-gradient(to right, #FF512F, #DD2476)', type: GOOD_EFFECT },
    ];

    return (
        <div className="grid grid-cols-2 btn-set overflow-x-hidden mt-3">
            <AnimatePresence>
                {buttons.map((button, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Button {...button} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ButtonsGrid;
