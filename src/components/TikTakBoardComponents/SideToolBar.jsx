import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Slider from "./Slider";
import TypeButtons from "./TypeButtons";
import FluidTextField from "./NameField";
import HamburgerSVG from "../../assets/svg/HamburgurSVG";
import {socket} from "../../contexts/WebsocketContext";
import EmojiButtonSet from "./EmojiButtonSet";

export default function SideToolBar({
                                        setScale,
                                        scale,
                                        selectedType,
                                        setSelectedType,
                                        username,
                                        setUsername
                                    }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const controls = useAnimation();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        controls.start(isCollapsed ? "visible" : "hidden");
    };

    const restartGame = () => {
        socket.emit('restartMsg')
    };


    return (
        <motion.div
            className="absolute top-0 left-0 mt-4 ml-4 bg-white rounded-lg shadow-md p-2 md:w-50 lg:w-25 h-[90vh] z-10"
            initial={{ width: "25%" }}
            animate={controls}
            variants={{
                hidden: { width: "4%" },
                visible: { width: "25%" }
            }}
        >
            {!isCollapsed && (
                <div className='flex flex-col h-full'>
                    <div className='flex flex-col h-[95%]'>
                        <Slider setScale={setScale} scale={scale} />
                        <TypeButtons
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />
                        <FluidTextField username={username} setUsername={setUsername} />
                        <EmojiButtonSet />
                    </div>
                    <div className="w-full flex justify-center">
                        <motion.button
                            onClick={restartGame}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-md"
                            animate={{ opacity: 1, translateY: 0, animationDelay: 1 }}
                            initial={{ opacity: 0, translateY: 4 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            NEW GAME
                        </motion.button>
                    </div>
                </div>
            )}
            <motion.button
                variants={{
                    hidden: {scale: 0},
                    visible: {
                        scale: 1
                    }
                }}
                transition={{delay: 1}}
                initial='hidden'
                animate='visible'
                onClick={toggleSidebar}
                className={`absolute top-0 right-[0] m-2 p-1 rounded-md bg-indigo-300 shadow-md`}
            >
                <HamburgerSVG />
            </motion.button>
        </motion.div>
    );
}