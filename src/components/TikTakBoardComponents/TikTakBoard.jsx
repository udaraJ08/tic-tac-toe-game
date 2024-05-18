import {motion} from "framer-motion";
import TikTakSquare from "./TikTakSquare";
import {initBoard, PRIMARY, SECONDARY} from "../../helpers/constants";
import {useEffect, useMemo, useState} from "react";
import {socket} from "../../contexts/WebsocketContext";
import {checkWinner} from "../../helpers/utils";
import winnerAudio from '../../assets/audio/winner.mp3';
import boo from '../../assets/audio/boo.mp3';
import ConfettiExplosion from "react-confetti-explosion";
import {toast} from "react-toastify";
import copyAudio from "../../assets/audio/copy.mp3";
import {useLocation, useNavigate} from "react-router-dom";

export default function TikTakBoard({scale, username, selectedType, setSelectedType}) {

    const [init, setInit] = useState(initBoard)
    const [isExploding, setIsExploding] = useState(false);
    const [combination, setCombination] = useState([])
    const [disable, isDisable] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const restartGame = () => {
        setInit(initBoard)
        setIsExploding(false)
        setCombination([])
        isDisable(false)
        setSelectedType(null)
    }

    useMemo(() => {
        const comb = checkWinner(init)

        if (comb.length > 0 && disable) {
            setCombination(checkWinner(init))
            socket.emit('winnerMsg', {username, code: location?.state.code})
            isDisable(true)
        }
    }, [init]);

    useEffect(() => {
        socket.on("userInput", (data) => {
            const {message, curType} = data

            setInit(prevInit => {
                const updatedInit = [...prevInit];
                updatedInit[message.number - 1] = message;
                return updatedInit;
            });

            // alert(0)
            // if (!selectedType) setSelectedType(curType === PRIMARY ? SECONDARY : PRIMARY)

            isDisable(message?.name?.toLowerCase()?.trim() === username?.toLowerCase()?.trim())
        })

        socket.on("winnerMsg", (data) => {
            const {message} = data

            console.log(message)
            console.log(username)

            const dis = message.toLowerCase()?.trim() === username?.toLowerCase()?.trim()
            const audio = new Audio(dis ? winnerAudio : boo)
            audio.play()

            if (dis) setIsExploding(true)
            isDisable(true)
        })

        socket.on("restartMsg", (data) => {
            toast.error(`${data} restart the game`)
            restartGame()
        })

        socket.on("connectRoom", async data => {
            toast.success(`${data} joined`)
            const audio = new Audio(copyAudio)
            await audio.play()
            restartGame()
        })

        socket.on('playerLeft', (data) => {
            toast.error(`${data} left the game`)
            restartGame()
        })

        socket.on("pageRefresh", (player) => {
            toast.error(`Other player restart the game`)
            // navigate('/', {
            //     replace: true
            // })
            restartGame()
        })

        return () => {
            socket.off('userInput')
            socket.off('winnerMsg')
            socket.off('resetMsg')
            socket.off('connectRoom')
            socket.off('playerLeft')
            socket.off('pageRefresh')
        }
    }, [username]);

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
    };

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
                        hidden: {y: 20, opacity: 0},
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                    className="bg-zinc-900 text-center rounded-lg shadow-md w-24 h-24 d-center font-bold"
                >
                    <TikTakSquare key={e.number} data={e} index={index} username={username} selectedType={selectedType}
                                  combination={combination} board={init} disable={disable} isDisable={isDisable}/>
                </motion.div>
            ))}
            <div style={{
                zIndex: -1
            }} className="absolute inset-0 flex justify-center items-center">
                {isExploding && <ConfettiExplosion force={1} particleCount={100}/>}
            </div>
        </motion.div>
    );
}