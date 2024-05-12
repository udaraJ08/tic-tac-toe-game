import {motion} from "framer-motion";
import TikTakSquare from "./TikTakSquare";
import {initBoard} from "../../helpers/constants";
import {useEffect, useMemo, useState} from "react";
import {socket} from "../../contexts/WebsocketContext";
import {checkWinner} from "../../helpers/utils";
import winnerAudio from '../../assets/audio/winner.mp3';

export default function TikTakBoard({scale, username, selectedType}) {

    const [init, setInit] = useState(initBoard)

    const [combination, setCombination] = useState([])

    useMemo(() => {
        const comb = checkWinner(init)

        if (comb.length > 0) {
            const audio = new Audio(winnerAudio)
            audio.play()
            setCombination(checkWinner(init))
        }
    }, [init]);

    useEffect(() => {
        socket.on("userInput", (data) => {
            const {message} = data

            setInit(prevInit => {
                const updatedInit = [...prevInit];
                updatedInit[message.number - 1] = message;
                return updatedInit;
            });
        })

        return () => {
            socket.off('userInput')
        }
    }, []);

    const container = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            scale: scale,
            transition: {
                delay: 0.2,
                staggerChildren: 0.3
            }
        }
    };;

    return (
        <motion.div
            className="grid grid-cols-3 gap-1"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {init?.map((e, index) => (
                <motion.div
                    key={e?.number}
                    variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                    className="bg-zinc-900 text-center rounded-lg shadow-md w-24 h-24 d-center font-bold"
                >
                    <TikTakSquare key={e.number} data={e} index={index} username={username} selectedType={selectedType} combination={combination}/>
                </motion.div>
            ))}
        </motion.div>
    );
}