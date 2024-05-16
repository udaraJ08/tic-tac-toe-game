import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePageView = () => {
    const [showJoinForm, setShowJoinForm] = useState(false);

    const handleJoinClick = () => {
        setShowJoinForm(true);
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
                        style={{ fontSize: '5rem' }}
                        className="text-large"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Tic Tac Toe
                    </motion.h1>
                    <motion.h1
                        style={{ fontSize: '1.2rem' }}
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
                                    onClick={handleJoinClick}
                                    className="bg-black w-25 py-5 px-4 rounded-md duration-75 hover:px-16 text-white text-lg"
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
                                    onClick={handleJoinClick}
                                    className="bg-black w-25 py-5 px-4 rounded-md duration-75 hover:px-16 text-white text-lg"
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
                                    placeholder="Enter game code"
                                    className="border border-none bg-white shadow-lg rounded-md px-2 py-1 outline-none text-lg"
                                />
                                <motion.button
                                    key="joinBtn"
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.06 }}
                                    onClick={() => alert('Joining a game')}
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