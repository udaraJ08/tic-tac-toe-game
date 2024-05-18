import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import randomstring from "randomstring";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import {socket} from "../../contexts/WebsocketContext";
import {toast} from "react-toastify";

const HomePageView = () => {
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    const navigate = useNavigate()


    const handleJoinClick = (code, isHost) => {

        if (!code) {
            toast.error('Not today son !')
            return;
        }

        const roomName = randomstring.generate(7)
        const player = isHost ? code : uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: ' ', })

        localStorage.setItem("player", player)

        socket.emit('connectRoom', isHost ? `${roomName}-${player}` : `${roomCode}-${player}`)

        navigate(`/game-room`, {
            state: {
                name: player,
                code: isHost ? roomName : roomCode
            },
            replace: true
        });
    };

    const handleCancelClick = () => {
        setShowJoinForm(false);
    };

    const titleVariants = {
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

    const subtitleVariants = {
        hidden: {
            opacity: 0,
            x: 50,
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
        <div className="flex justify-center items-center w-screen h-screen bg-indigo-50">
            <div className="w-75 d-center flex-column">
                <div className="flex align-items-end flex-column">
                    <motion.h1
                        // style={{ fontSize: '5rem' }}
                        className="text-5xl md:text-8xl lg:text-8xl"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Tic Tac Toe
                    </motion.h1>
                    <motion.h1
                        className="text-md md:text-lg lg:text-lg"
                        variants={subtitleVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        By Udara J. Wanniarachchi
                    </motion.h1>
                </div>
                <div className="mt-20 w-full d-center flex-column gap-2">
                    <AnimatePresence>
                        {!showJoinForm ? (
                            <>
                                <motion.button
                                    key="host"
                                    initial={{ x: '-100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '-100%', opacity: 0 }}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.06 }}
                                    onClick={() => handleJoinClick(uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: ' ', }), true)}
                                    className="bg-black custom-btn py-5 px-4 rounded-md duration-75 hover:px-16 text-white text-lg"
                                >
                                    HOST NEW GAME
                                </motion.button>
                                <motion.button
                                    key="join"
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.06 }}
                                    onClick={() => setShowJoinForm(true)}
                                    className="bg-black custom-btn py-5 px-4 rounded-md duration-75 hover:px-16 text-white text-lg"
                                >
                                    JOIN A GAME
                                </motion.button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <motion.input
                                    key="input"
                                    initial={{ x: '-100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '-100%', opacity: 0 }}
                                    type="text"
                                    onChange={e => setRoomCode(e.target.value)}
                                    placeholder="Enter game code"
                                    className="border border-none bg-white shadow-lg rounded-md px-2 py-1 outline-none text-lg"
                                />
                                <motion.button
                                    key="joinBtn"
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.06 }}
                                    onClick={() => handleJoinClick(roomCode, false)}
                                    className="bg-black py-5 text-center px-4 rounded-md duration-75 hover:px-16 text-white text-lg"
                                >
                                    JOIN
                                </motion.button>
                                <motion.button
                                    key="cancelBtn"
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.06 }}
                                    onClick={handleCancelClick}
                                    className="bg-rose-800 shadow-lg px-4 text-center py-5 rounded-md duration-75 hover:px-16 text-white text-lg"
                                >
                                    X
                                </motion.button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default HomePageView;
