import { motion } from "framer-motion";
import { PRIMARY, SECONDARY } from "../../helpers/constants";
import {Fragment} from "react";
import {socket} from "../../contexts/WebsocketContext";
import clickAudio from '../../assets/audio/bubble-sound.mp3'

export default function TikTakSquare({ data, username, selectedType, combination, index }) {

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

    const handleSquareBtn = () => {

        const audio = new Audio(clickAudio)

        audio.play()

        const cookedObj = {
            ...data,
            name: username,
            type: selectedType
        }

        socket.emit('userInput', cookedObj)
    }

    return (
        <motion.div
            onClick={handleSquareBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ fontSize: '4.1rem' }}
            className={`${combination?.includes(index) ? 'bg-rose-700' : 'bg-zinc-900'} text-center rounded-lg shadow-md w-24 h-24 d-center font-bold pointer`}
        >
            {handleType()}
        </motion.div>
    );
}